const express = require('express');
const { User, validateUser } = require("../models/user");
// const Token = require("../models/token");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
// const sendEmail = require("../utils/sendEmail");
// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


router.post("/signup", async (req, res) => {
    try {
        const user = req.body;
        const { error, value } = validateUser(user);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
                
        const takenEmail = await User.findOne({email: user.email});

        if (takenEmail) {
            res.status(400).json({message: 'Email is Already Registered'})
        } else {
            user.password = await bcrypt.hash(req.body.password, 10);
            
            const newUser = await new User({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email.toLowerCase(),
                password: user.password
            }).save();

            const payload = {
                id: newUser._id, 
                email: newUser.email,
            };
            
            try {
                const token = jwt.sign(payload, process.env.JWT_SECRET, {}); // expiresIn: '24h'
    
                return res.json({token: "Bearer " + token});
            } catch (err) {
                return res.status(500).json({message: "Internal Error"});
            }
        }

    } catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});


// router.post("/send-token", requireAuth, async (req, res) => {
//     try {
//         // Handle verification err
//         const user = await User.findOne({_id: req.user.id});
//         const userToken = await user.generateAuthToken();

//         let token = await Token.findOne({userId: user._id});
        
//         if (!token) {
//             token = await new Token({
//                 userId: user._id,
//                 token: userToken,
//             }).save();
//         }
        

//         // Send verification email
//         await sendEmail(user.email, "Verify your email", token.token);

//         res.json({ message: "Success" });

//     } catch (error) {
// 		console.log(error);
// 		res.status(500).json({ message: "Internal Server Error" });
// 	}
    
// })


// router.post("/verify-token/:token/", requireAuth, async (req, res) => {
// 	try {
// 		const user = await User.findOne({ _id: req.user.id });
// 		// Is it possible to pass verifyJWT with an user NOT in DB? then make DB check
//         // if (!user) return res.status(400).send({ message: "Invalid link" });

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send({ message: "Invalid token" });

// 		await User.updateOne({ _id: user._id, verified: true });
// 		await token.remove();

// 		res.status(200).send({ message: "Email verified successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });


router.post('/login', async (req, res) => {
    const userLogging = req.body;

    const user = await User.findOne({email: userLogging.email})
    
    if (!user) {
        return res.status(400).json({message: "Invalid email or password"});
    }

    const passCorrect = await bcrypt.compare(userLogging.password, user.password)

    if (passCorrect) {
        const payload = {
            id: user._id, 
            email: user.email
        };
        try {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {});

            return res.json({token: "Bearer " + token});
        } catch (err) {
            return res.status(500).json({message: "Internal Error"});
        }
    } else {
        return res.status(400).json({message: "Invalid email or password"})
    }
});


module.exports = router;