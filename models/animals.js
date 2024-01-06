//Deps

const mongoose = require("./connection")

//Animals Schema Variable
const {Schema, model} = mongoose

//Animals Schema
const animalsSchema = new Schema ({
    species: String,
    location: String,
    extinct: Boolean,
    lifeExpectancy: String,
})

//Animals Model
const Animals = model("Animals", animalsSchema)

//Export the Model
module.exports = Animals