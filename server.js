// MAIN PAGE: https://evening-wave-14088.herokuapp.com/eventTracker_home.html
const express = require("express");
const path = require("path");

const entryController = require("./controllers/entryController.js");
// const noteController = require("./controllers/noteController.js");
// const themeController = require("./controllers/themeController.js");

const PORT = process.env.PORT || 5000;

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extened: true}));

// Entry Controllers
app.get("/getLastEntry", entryController.getLastEntry);

// Note Controllers


// Theme Controllers



app.listen(PORT, function() {
    console.log("Server listening on Port: " + PORT);
});