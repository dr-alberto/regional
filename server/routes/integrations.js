const express = require('express');
const integrationsController = require("../controllers/integrations.controller")

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

router.post("/integrations/wp/verify", integrationsController.verifyWPIntegration);


module.exports = router;