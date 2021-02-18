const express = require('express');
const bodyParser = require("body-parser");
const Expapp = express();

Expapp.use(bodyParser.json());

Expapp.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*"),
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Request-With, Content-type, Accept"),

  next();
})

Expapp.post('/lights', (req, res, next) => {
  res.status(200).json({
    message: "Successful"
  })
});

module.exports = Expapp;
