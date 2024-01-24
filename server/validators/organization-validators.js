const { body, param } = require("express-validator");


module.exports.organizationValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Organization name cannot be empty")
        .bail()
        .isLength({ max: 64 })
        .withMessage("Organization name too large")
];

module.exports.customDomain =  [
    body("subdomain")
        .isLength({ min: 1 })
        .withMessage("Invalid domain")
        .matches(/^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})+\.[a-zA-Z]{2,}$/)
        .withMessage('Invalid domain format (portal.domain.com)'),
]