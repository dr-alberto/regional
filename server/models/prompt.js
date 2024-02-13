const mongoose = require("mongoose");


const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)


const promptSchema = new mongoose.Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    portalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portal', required: true },
    name: { type: String, required: true },
    lastUpdated: {type: Date, required: true},
    views: {type: Number, default: 0},
    font: { type: String, default: 'sistem-ui' },
    style: { type: String, default: 'Rounded' },
    color: { type: String, validator: [colorValidator, 'Invalid color'], default: '#09090B'},
    showOnlyToNonAvailableRegions: { type: Boolean, default: false },
});
  
const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = { Prompt }