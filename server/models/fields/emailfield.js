const mongoose = require('mongoose');
const { Field } = require('./field')



const emailFieldSchema = new mongoose.Schema({
    type: {type: String, default: 'email'},
    label: {type: String, required: true},
    placeholder: {type: String, default: ''},
})

const EmailField = Field.discriminator('EmailField', emailFieldSchema)

module.exports = mongoose.model('EmailField');