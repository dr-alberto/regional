const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const regionSchema = new Schema({
	name: { type: String},
    'country code': { type: String},
    timezone: { type: String},
    population: { type: Number},
    'admin1 name': { type: String},
    'admin2 name': { type: String},
});

regionSchema.index({'$**': 'text'});

const Region = mongoose.model("Region", regionSchema);

module.exports = { Region };