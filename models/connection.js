//Deps
    require("dotenv").config()
    const mongoose = require("mongoose")

//Establish Connection
    //Get URL
        const DATABASE_URL = process.env.DATABASE_URL
    
    //Establish Connection
        mongoose.connect(DATABASE_URL)
    
    //Connection Events
        mongoose.connection
        .on("open", () => {console.log("Connected to Mongoose")})
        .on("close", () => {console.log("Disconnected from Mongoose")})
        .on("error", (error) => {console.log(error)})

//Export the Connection
    module.exports = mongoose
