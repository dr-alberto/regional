const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = mongoose.Schema({
    firstName: {type: String, required: [true, "First name is required"]},
    lastName: {type: String, required: [true, "Last name is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true},
    password: {type: String, required: true},
    customerId: {type: String},
    subscriptionId: {type: String},
    plan: {type: Number, default: 0}
}, {timestamps: true});



const User = mongoose.model("User", userSchema);


const validateUser = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
    
	return schema.validate(data);
};



module.exports = {User, validateUser};