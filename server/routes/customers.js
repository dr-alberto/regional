const express = require('express');
const requireAuth = require("../middleware/requireAuth");
const customersController = require('../controllers/customers-controller')

const router = express.Router();

/*
    POST /customers
    GET /customers/:formId
*/

router.post("/customers/:portalId", customersController.addCustomer);

router.get("/customers/:portalId", requireAuth, customersController.fetchCustomers);

router.get("/customers/:portalId/download", requireAuth, customersController.downloadCustomers)

module.exports = router;