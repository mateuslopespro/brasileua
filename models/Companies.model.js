let mongoose = require('mongoose')
let Schema = mongoose.Schema

let companySchema = new Schema({
	name: String,
    state: String,
    city: String,
    category: String,
    intro: String,
    url: String,
    description: String,
    medias: {
        website: String,
        facebook: String,
        instagram: String,
        youtube: String,
        twitter: String
    },
    phones: {
        cell: String,
        landline: String,
        whatsapp: String
    }
})


let Company = mongoose.model('Company', companySchema)
module.exports = Company