const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const organizationSchema = new Schema({
	name: { type: String, required: true },
    logo: { type: String, required: true },
    users: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
		unique: true,
	}],
    subdomain: { type: String },
    validSubdomain: { type: Boolean, default: false }
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = { Organization };