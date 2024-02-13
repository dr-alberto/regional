const express = require('express');
const { Form } = require("../models/form");
const { Organization } = require("../models/organization");
const requireAuth = require("../middleware/requireAuth");
const formController = require("../controllers/form-controller")
const formValidators = require("../validators/form-validators")
const { upload } = require('../services/multer');
const { Customer } = require('../models/customer');
const fs = require('fs');
const path = require('path')


const router = express.Router();



/*
    POST /forms
    POST /forms/:id
    GET /forms/overview
    GET /forms/:id
    GET /forms
    
    DELETE /forms/:id

    // Custom domain
    GET /portal/:id

*/


// GET portal from custom domain
router.get("/live/:id", async (req, res) => {
    const formId = req.params.id
    const hostname = req.hostname

    Form.findById(formId)
    .then(async (form) => {

        if (!form) {
            res.status(404).json({ message: 'Not ok'})
            return
        }
        
        // console.log("Hello", hostname)
        const userId = form.userId
        const organization = await Organization.findOne({ users: userId })
        const organizationDomain = organization.subdomain
        const organizationDomainIsValid = organization.validSubdomain

        if (organizationDomain === hostname && organizationDomainIsValid) {

            fs.readFile(path.resolve("./../client/build/index.html"), "utf8", (err, data) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send("An error occurred");
                }
            
                return res.send(data)
            });

        } else {
            res.json({ message: "invalid subdomain" })
        }
        
    })
    .catch((error) => {
        res.status(404).json({ message: 'Not ok' })
    })
})

// CREATE form
router.post("/api/forms", requireAuth, formValidators.formValidator, formController.createForm)

// EDIT form 
router.post("/api/forms/:id", requireAuth, upload.single("productImg"), formValidators.formValidator, formController.updateForm)



const processUserForm = async (userForm, countryCount) => {
    const formId = userForm._id;
  
    try {
        const formCustomers = await Customer.find({ portalId: formId });
    
        formCustomers.forEach((customer) => {
            if (countryCount.hasOwnProperty(customer.country)) {
            countryCount[customer.country]++;
            } else {
            countryCount[customer.country] = 1;
            }
        });
    } catch (error) {
        console.log(error);
    }
};

  
// GET user forms overview
router.get("/api/forms/overview", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const userForms = await Form.find({ userId: userId })

    const views = userForms.reduce((sum, form) => sum + form.views, 0);
    const submits = userForms.reduce((sum, form) => sum + form.customers, 0);
    
    var countryCount = {};
    const userFormPromises = userForms.map((userForm) => processUserForm(userForm, countryCount));
    
    try {
        await Promise.all(userFormPromises)
    } catch (error) {}

    const countriesCount = Object.entries(countryCount).map(([key, value]) => {
        return {id: key, value: value}
    });

    let conversionRate = 0
    if (views > 0) {
        conversionRate = (submits / views) * 100
    } else {
        conversionRate = 0
    }
    
    conversionRate = conversionRate.toFixed(2);

    res.json({
        views,
        submits,
        conversionRate,
        countriesCount
    })
})

// GET form
router.get("/api/forms/:id", async (req, res) => {
    const mode = req.query.mode; // 'live' if portal is fetched from live user portal page
    const formId = req.params.id;

    const form = await Form.findOne({_id: formId})

    if (!form) {
        res.status(400).json("Form not found")
    }

    if (mode === 'live') {
        form.views ++
        form.save()
    }

    const organization = await Organization.findOne({users: form.userId})

    const response = {
        'form': form,
        'organization': organization
    }

    res.json(response)
})


// GET all user's forms
router.get("/api/forms", requireAuth, async (req, res) => {
    const userId = req.user.id;
    try {
        const forms = await Form.find({userId: userId})
        res.json(forms)
    } catch (error) {
        res.status(400).json("Invalid user")
    }
})




// // DELETE form
// router.delete("/forms", async (req, res) => {
//     const formId = req.params.id;
// })






module.exports = router;