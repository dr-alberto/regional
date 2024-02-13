const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript

const siteSchema = new Schema({
    domain: { type: String, required: true },
    // icon: { type: String },
    users: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
	}],
    subdomain: { type: String },
    validSubdomain: { type: Boolean, default: false }
});

const Site = mongoose.model("Site", siteSchema);

module.exports = { Site };