const express = require('express');
const bodyParser = require("body-parser");
const { spawn } = require('child_process');

const Expapp = express();
const PythonOn = spawn('python', ['gpio_on.py']);
const PythonOff = spawn('python', ['gpio_off.py']);

Expapp.use(bodyParser.json());

Expapp.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*"),
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Request-With, Content-type, Accept"),

  next();
})

Expapp.post('/lights/on', (req, res, next) => {
  res.status(200).json({
    message: "Switched ON"
  })
  PythonOn.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  PythonOn.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

Expapp.post('/lights/off', (req, res, next) => {
  res.status(200).json({
    message: "Switched OFF"
  })
  PythonOff.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  PythonOff.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

module.exports = Expapp;
