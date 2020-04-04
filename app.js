const express = require('express')
const app = express()

const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const authcontroller = require('./controllers/auth')


mongoose.connect("mongodb://localhost:27017/bank?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false&useNewUrlParser=true")
    .then(() => {
        console.log('Connected to database')
    })
    .catch(() => {
        console.log('Connection failed')
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use("/auth",authcontroller)


module.exports = app
