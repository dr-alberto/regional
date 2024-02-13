const express = require('express');
const requireAuth = require("../middleware/requireAuth");
const requirePlan = require("../middleware/requirePlan");
const siteController = require('../controllers/site.controller')
const validators = require("../validators/site-validators");

const router = express.Router();

/*  
    POST /sites
    POST /sites/:id
    GET /sites
    DELETE /sites/:id
    POST /sites/:id/custom-domain
    POST /sites/:id/custom-domain/verify
    GET /sites/:id/custom-domain  
*/

// POST /sites
router.post("/sites", requireAuth, validators.siteValidator, siteController.createSite);

// POST /sites/:id
router.post("/sites/:id", requireAuth, validators.siteValidator, siteController.editSite);

// GET /sites
router.get("/sites", requireAuth, siteController.getUserSites);

// DELETE /sites/:id
router.delete("/sites/:id", requireAuth, siteController.deleteSite);

// POST /sites/:id/custom-domain
router.post("/sites/:id/custom-domain", requireAuth, validators.customDomain, siteController.updateSiteCustomDomain)

// POST /sites/:id/custom-domain/verify
router.post("/sites/:id/custom-domain/verify", requireAuth, siteController.verifySiteCustomDomain)


module.exports = router;