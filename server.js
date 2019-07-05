// MAIN PAGE: https://evening-wave-14088.herokuapp.com/eventTracker_home.html
const express = require("express");
const path = require("path");

var app = express();

const entryController = require("./controllers/entryController.js");
const noteController = require("./controllers/noteController.js");
const themeController = require("./controllers/themeController.js");

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extened: true}));

app.get("/getLastEntry", entryController.getLastEntry);


app.listen(PORT, function() {
    Console.log("Server listening on Port: " + PORT);
});