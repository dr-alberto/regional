const mongoose = require('mongoose');


const fieldSchema = new mongoose.Schema({
    // Common fields for all Field objects
    name: { type: String, required: true},
    editable: { type: Boolean, required: true},
}, { discriminatorKey: 'field'})

const Field = mongoose.model('Field', fieldSchema);

module.exports = { Field, fieldSchema }