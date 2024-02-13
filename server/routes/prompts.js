const express = require('express')
const requireAuth = require("../middleware/requireAuth");
const promptController = require("../controllers/prompt.controller")
const promptValidators = require("../validators/prompt.validators")

const router = express.Router();


/*
    POST /prompts
    POST /prompts/:id
    GET /prompts
    GET /prompts/:id
    DELETE /prompts/:id
*/

router.post('/prompts', requireAuth, promptValidators.promptValidator, promptController.createPrompt)

router.post('/prompts/:id', requireAuth, promptValidators.promptValidator, promptController.updatePrompt)

router.get('/prompts/:id', promptController.fetchPrompt)

router.get('/prompts', requireAuth, promptController.fetchAllPrompts)

router.delete('/prompts/:id', requireAuth, promptController.deletePrompt)

module.exports = router;