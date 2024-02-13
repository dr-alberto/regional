const mongoose = require("mongoose");


const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)


const portalSchema = new mongoose.Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    name: { type: String, required: true },
    lastUpdated: {type: Date, required: true},
    views: {type: Number, default: 0},
    customers: {type: Number, default: 0},
    brandImg: { type: String },
    brandName: { type: String },
    productName: { type: String },
    productDescription: { type: String },
    productImg: { type: String },
    cancelUrl: { type: String },
    successUrl: { type: String },
    privacyPolicyUrl: { type: String },
    termsUrl: { type: String },
    font: { type: String, default: 'sistem-ui' },
    style: { type: String, default: 'Rounded' },
    color: { type: String, validator: [colorValidator, 'Invalid color'], default: '#09090B'},
    availableRegions: { type: Array },
    published: { type: String },
    // publishedUrl: { type: String },
});
  
const Portal = mongoose.model('Portal', portalSchema);

module.exports = { Portal }