const { body } = require("express-validator");


module.exports.promptValidator = [
    body("name")
        .trim()
        .isLength({ max: 64 })
        .withMessage("Name too large (max 64 characters)")
]