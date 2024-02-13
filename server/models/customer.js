const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    portalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portal', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
}, {timestamps: true});


const Customer = mongoose.model('Customer', customerSchema);

module.exports = {Customer};