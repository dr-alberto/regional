const { body, param } = require("express-validator");


module.exports.siteValidator = [
    body("domain")
        .isURL()
        .withMessage("Invalid domain URL"),
];

module.exports.customDomain =  [
    body("subdomain")
        .isLength({ min: 1 })
        .withMessage("Invalid domain")
        .matches(/^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})+\.[a-zA-Z]{2,}$/)
        .withMessage('Invalid domain format (portal.domain.com)'),
]