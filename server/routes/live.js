const express = require('express');
const fs = require('fs');
const path = require('path');
const { Portal } = require("../models/portal");
const { Site } = require('../models/site');

const router = express.Router();


function validateSubdomain(req, res, next) {}

// GET portal from custom domain
router.get("/live/:id", async (req, res) => {
    const portalId = req.params.id
    const hostname = req.hostname


    if (hostname === process.env.HOST_NAME) {
        res.sendFile(
            path.resolve(__dirname, '../../', 'client', 'build', 'index.html')
        )
        return;
    }

    Portal.findById(portalId)
    .then(async (portal) => {

        if (!portal) {
            res.status(404).json({ message: 'Not ok'})
            return
        }
        
        const site = await Site.findById(portal.siteId)
        const siteSubdomain = site.subdomain
        const siteSubdomainIsValid = site.validSubdomain

        if (siteSubdomain === hostname && siteSubdomainIsValid) {

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


module.exports = router;