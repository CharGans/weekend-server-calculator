const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []

// Here's a wonderful place to make some routes:

//app.get sends back the calculations array as a response
// GET /calculations

app.get('/calculations', (req, res) => {
  res.send(calculations);
    console.log('successful GET request');
});

// app.post takes in a new calculation object and
// adds it to the calculations array
// POST /calculations

app.post('/calculations', (req, res) => {
   const numberOne = Number(req.body.numberOne);
   const numberTwo = Number(req.body.numberTwo);
   const method = req.body.method

  //turn all methods into an object that has the value of different arrow functions
console.log('chosen method function', method);

    let methodTypes = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b
    };

let chosenMethod = methodTypes[method];

  let result = chosenMethod(numberOne, numberTwo);
  let newCalculation = { numberOne, numberTwo, method, result };

  calculations.push(newCalculation);
  console.log('added new calculation', newCalculation);
  res.sendStatus(201);
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5002;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
