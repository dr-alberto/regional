const mongoose = require('mongoose');
const { Field } = require('./field')



const selectFieldSchema = new mongoose.Schema({
    type: {type: String, default: 'select'},
    label: {type: String, required: true},
    options: { type: Array },
})

const SelectField = Field.discriminator('SelectField', selectFieldSchema)

module.exports = mongoose.model('SelectField');