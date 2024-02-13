const { body } = require("express-validator");


module.exports.portalValidator = [
    body("name")
        .trim()
        .isLength({ max: 64 })
        .withMessage("Name too large (max 64 characters)"),
    body("brandName")
        .trim()
        .isLength({ max: 64 })
        .withMessage("Name too large (max 64 characters)"),
    body("productName")
        .trim()
        .isLength({ max: 64 })
        .withMessage("Name too large (max 64 characters)"),
    body("productDescription")
        .trim()
        .isLength({ max: 264 })
        .withMessage("Description too large (max 264 characters)"),
    body("successUrl")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Invalid URL"),
    body("cancelUrl")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Invalid URL"),
    body("privacyPolicyUrl")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Invalid URL"),
    body("termsUrl")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Invalid URL"),
];