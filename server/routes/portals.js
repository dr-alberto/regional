const express = require('express')
const requireAuth = require("../middleware/requireAuth");
const portalController = require("../controllers/portal.controller")
const portalValidators = require("../validators/portal.validators")
const { upload } = require('../services/multer');

const router = express.Router();


/*
    POST /portals
    POST /portals/:id
    GET /portals/overview
    GET /portals/:id
    GET /portals
    
    DELETE /portals/:id

    // Custom domain
    GET /portal/:id

*/




router.post('/portals', requireAuth, portalValidators.portalValidator, portalController.createPortal)

router.post('/portals/:id', requireAuth, upload.fields([{name: 'productImg', maxCount: 1}, {name: 'brandImg', maxCount: 1}]), portalValidators.portalValidator, portalController.updatePortal)

router.post('/portals/:id/status', requireAuth, portalController.updatePortalStatus)

router.get('/portals/overview', requireAuth, portalController.portalsOverview)

router.get('/portals/:id', portalController.fetchPortal)

router.get('/portals', requireAuth, portalController.fetchAllPortals)

router.delete('/portals/:id', requireAuth, portalController.deletePortal)

module.exports = router;