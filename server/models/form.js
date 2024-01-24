const mongoose = require("mongoose");
const { fieldSchema } = require("./fields/field")


const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)


// 2. Define user portal results model (plain JSON)
const formSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    // description: { type: String, required: true },
    
    lastUpdated: {type: Date, required: true},
    views: {type: Number, default: 0},
    customers: {type: Number, default: 0},
    // fields: [fieldSchema],

    productName: { type: String },
    productDescription: { type: String },
    cancelUrl: { type: String },
    successUrl: { type: String },
    privacyPolicyUrl: { type: String },
    termsUrl: { type: String },
    formFont: { type: String, default: 'sistem-ui' },
    formStyle: { type: String, default: 'Rounded' },
    formColor: { type: String, validator: [colorValidator, 'Invalid color'], default: '#09090B'},
    availableRegions: { type: Array },
    productImg: { type: String }
});
  
const Form = mongoose.model('Form', formSchema);

module.exports = { Form }