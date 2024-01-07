//Deps
    require("dotenv").config()

    const express = require("express")

    const morgan = require("morgan")

    const methodOverride = require("method-override")

    const mongoose = require("./models/connection")

    const Animals = require("./models/animals")

//App Object
const app = express()

//Middleware
app.use(morgan("dev"))

app.use(methodOverride("_method"))

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

//Routes and Routers
    app.get("/", (req, res) => {

        res.send("RAWR")
        
    })

//SEED
    app.get("/seed", async (req, res) => {

        try {

            const startAnimals = [

                {species: "Lion", location: "Africa and India", extinct: false, lifeExpectancy: "Females: 15-16 years | Males: 8-10 years"},

                {species: "Hammerhead Shark", location: "Temperate and Tropical Waters", extinct: false, lifeExpectancy: "44 years"},

                {species: "Tardigrade", location: "Literally anywhere. Even space!", extinct: false, lifeExpectancy: "Anywhere from 3 months to 2 years depending on class"},

                {species: "Dodo", location: "Island of Mauritius", extinct: true, lifeExpectancy: "Females: 17 years | Males: 21 years"},

                {species: "Domestic House Cat", location: "Wherever they damn well please", extinct: false, lifeExpectancy: "Who knows? They have nine lives"}
            ]

            await Animals.deleteMany({})

            const animals = await Animals.create(startAnimals)

            res.json(animals)

        }catch (error) {

            console.log(error.message);

            res.send("There was error, read logs for error details");

          }
    })

//INDUCES
    //Index
        app.get("/animals", async (req, res) => {
            try {
                const animals = await Animals.find({})

                res.render("animals/index.ejs", { animals })

            } catch (error) {

                console.log("-----", error.message, "-----")

                res.status(400).send("error, read logs for details")
            }
        })

    //New
        app.get("/animals/new", (req, res) => {

            res.render("animals/new.ejs")
        })


    //Destroy
        app.delete("/animals/:id", async (req, res) => {
            
            const id = req.params.id
            
            await Animals.findByIdAndDelete(id)
            
            res.redirect("/animals")
        })


    //Update
    app.put("/animals/:id", async (req, res) => {

        try {
          
          const id = req.params.id
          
          req.body.extinct = req.body.extinct === "on" ? true : false
          
          await Animals.findByIdAndUpdate(id, req.body)
          
          res.redirect(`/animals/${id}`);

        } catch (error) {
          console.log("-----", error.message, "------")
          res.status(400).send("error, read logs for details")
        }
      })


    //Create
        app.post("/animals", async (req, res) => {

            try {
           
            req.body.extinct = req.body.extinct === "on" ? true : false
            
            await Animals.create(req.body)
            
            res.redirect("/animals")

            } catch (error) {
            console.log("-----", error.message, "------")
            res.status(400).send("error, read logs for details")
            }
        });


    //Edit
    app.get("/animals/:id/edit", async (req, res) => {

        try {
        
          const id = req.params.id;
          
          const animals = await Animals.findById(id)
          
          res.render("animals/edit.ejs", { animals })

        } catch (error) {
          console.log("-----", error.message, "------")
          res.status(400).send("error, read logs for details")
        }
      })


    //Show
    app.get("/animals/:id", async (req, res) => {

        try {
          
          const id = req.params.id;
      
          const animals = await Animals.findById(id);
      
          res.render("animals/show.ejs", { animals });

        } catch (error) {
          console.log("-----", error.message, "------");
          res.status(400).send("error, read logs for details");
        }
      });



//Server Listener
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`The one ring to rule them all in ${PORT}`)
    })