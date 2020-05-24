// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialsize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
const server = app.listen(port, ()=> { console.log(`Running on local host: ${port}`)});
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

app.get('/all',(req,res) =>{
    res.send(JSON.stringify(projectData));
    console.log(projectData);
});


// Post Route


app.post('/add',(req,res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.response = req.body.userResponse;
    res.end();
});