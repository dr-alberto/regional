const express = require('express');
const requireAuth = require("../middleware/requireAuth");
const requirePlan = require("../middleware/requirePlan");
const organizationController = require('../controllers/organization-controller')
const validators = require("../validators/organization-validators");
const { upload } = require('../services/multer');

const router = express.Router();

/*
    
    POST /organizations
    POST /organizations/:id
    GET /organizations/:user_id
    (DELETE /organizations/:id)
    POST /organizations/:id/custom-domain
    POST /organizations/:id/custom-domain/verify
    GET /organizations/:id/custom-domain
    
*/

router.post("/organizations", requireAuth, upload.single("logo"), organizationController.createOrganization);

router.post("/organizations/:id", requireAuth, upload.single("logo"), organizationController.updateOrganization);

router.get("/organizations", requireAuth, organizationController.fetchUserOrganization);

router.post("/organizations/:id/custom-domain", requireAuth, requirePlan, validators.customDomain, organizationController.updateOrganizationCustomDomain)

router.post("/organizations/:id/custom-domain/verify", requireAuth, requirePlan, organizationController.verifyOrganizationCustomDomain)


module.exports = router;