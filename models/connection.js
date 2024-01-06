//Deps
require("dotenv").config()
const mongoose = require("mongoose")

//Establish Connection
    //URL Grab from env
        const DATABASE_URL = process.env.DATABASE_URL
    //Establish mongoose connection
        mongoose.connect(DATABASE_URL)
    //Connection Events
    .on("open", () => {console.log("Connected to Mongoose")})
    .on("close", () => {console.log("Disconnected from Mongoose")})
    .on("error", (error) => {console.log(error)})

//Export the Connection
    module.exports = mongoose