// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


app.get('/weather', getData);
function getData(req, res){
  res.send(projectData);
}

app.post('/weather', postData);
function postData(req, res){
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.input = req.body.input;
  res.send(projectData);
}

app.listen(port, console.log('Listening on port:'+port));
