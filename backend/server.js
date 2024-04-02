const dotenv =require( "dotenv" ).config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute")


const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // parse application/
app.use(bodyParser.json());

// route middleware
app.use("/api/users", userRoute);


// Routes

app.get("/" , (req, res)=>{
    res.send("Home page");
})

const PORT = process.env.PORT  || 5000 ; 

// connect to db and start server

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, () =>{
        console.log(`srever running on port  ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})
