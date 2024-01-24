const mongoose = require('mongoose');
const { Field } = require('./field')



const textFieldSchema = new mongoose.Schema({
    type: {type: String, default: 'text'},
    label: {type: String, required: true},
    placeholder: {type: String, default: ''},
})

const TextField = Field.discriminator('TextField', textFieldSchema)

module.exports = mongoose.model('TextField');