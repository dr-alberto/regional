const jwt = require('jsonwebtoken');


// TODO: https://dev.to/smitterhane/3-tier-authentication-understand-and-conceptualize-the-process-2g3m
// TODO; One middleware for each plan available


const requirePlan = async (req, res, next) => {
    // verify authentication
    const token = req.headers["x-access-token"]?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({
                isLoggedIn: false,
                message: "Failed to authenticate"
            })
            req.user = {};
            req.user.id = decoded.id;
            req.user.email = decoded.email;
            // req.user.verified = decoded.verified;
            
            next()
        })
    } else {
        res.status(401).json({message: "Incorrect token"})
    }
}

module.exports = requirePlan