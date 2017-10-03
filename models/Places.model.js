let mongoose = require('mongoose')
let Schema = mongoose.Schema

let placeSchema = new Schema({
	state: String,
	cities: Array
})


let Place = mongoose.model('Place', placeSchema)
module.exports = Place