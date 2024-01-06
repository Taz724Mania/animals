//Deps
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")



//database connect
const {DATABASE_URL, SECRET, PORT} = process.env

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

//app object
const app = express()

//routes
app.get("/", (req, res) => {
    res.send("They were, all of them, deceived. For another ring was made.")
})


//server listener
app.listen(PORT, () => {
    console.log(`The one ring to rule them all in ${PORT}`)
})