// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

const server = app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

app.get("/getWeather", (req, res) => {
    console.log(projectData);
    console.log("inside get weather");
    if (!projectData || Object.keys(projectData).length == 0) {
        res.json({ data: projectData, status: 404 });
    }else{res.json({data: projectData, status: 200})}
});

app.post("/addFeelings", (req, res) => {
    console.log(req.body);
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    console.log(projectData);
    res.json({ success: 200 });
});
