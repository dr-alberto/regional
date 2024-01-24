const { Form } = require('../models/form')
const { TextField, EmailField, SelectField, Field } = require('../models/fields')
const countries = require("../utils/countries")
const {validationResult}  = require('express-validator');


module.exports.createForm = async (req, res, next) => {
    const formName = req.body.name;
    const formDescription = req.body.description;

    const nameField = new TextField({
        name: "name",
        label: "Name",
        editable: true
    })

    const emailField = new EmailField({
        name: "email",
        label: "Email",
        editable: false
    })

    const regionField1 = new SelectField({
        name: "region-1", 
        label: "Country",
        options: countries, // Change to other based on user input
        editable: false
    })

    const regionField2 = new TextField({
        name: "region-2", 
        placeholder: "Address",
        editable: false
    })
    
    const form = await new Form({
        userId: req.user.id,
        name: formName,
        description: formDescription,
        lastUpdated: new Date(),
        fields: [nameField, emailField, regionField1, regionField2]
    }).save()

    res.json({id: form._id})
}

const fieldsModels = {
    'text': TextField,
    'email': EmailField,
    'select': SelectField
}


module.exports.updateForm = async (req, res, next) => {
    
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err)
        return
    }    

    const formId = req.params.id;
    let payload = req.body;
    
    const form = await Form.findOne({ _id: formId});

    // Check form exist and user is admin
    if (!form || form.userId != req.user.id) {
        res.status(404).json({message: 'Form not found'})
        
    }

    // Add product image to payload
    if (req.file) {
        payload = {...payload, productImg: req.file.filename}
    }

    // Handle comma separated string for the availableRegions field
    if (payload.availableRegions === "") {
        payload = {...payload, availableRegions: []}
    } else {
        const availableRegions = payload.availableRegions.split(',')
        payload = {...payload, availableRegions: availableRegions}
    }
    
    form.set(payload)

    try {
        await form.save()
        res.json({message: 'OK'})
    } catch (error) {
        // Return error message and initial form to repopulate fields in client
        const initialForm = await Form.findOne({ _id: formId});
        res.status(500).json({message: 'Server Error', form: initialForm})
    }

    
}