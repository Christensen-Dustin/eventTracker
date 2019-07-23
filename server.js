// MAIN PAGE: https://evening-wave-14088.herokuapp.com/eventTracker_home.html
const express = require("express");
const path = require("path");
const session = require("express-session");

const userController = require("./controllers/userController.js");
const entryController = require("./controllers/entryController.js");
const noteController = require("./controllers/noteController.js");
const themeController = require("./controllers/themeController.js");

const PORT = process.env.PORT || 5000;

var app = express();

// VIEW
app.set('views', 'view');
app.set('view engine', 'ejs');

// Static Directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Session Set-up
app.use(session({
    secret: 'Bacon-is-great-for-every-session',
    resave: true,
    saveUninitialized: true
}));

// var userData;

// User Controller
app.get("/getUser", userController.getUserData);

// Entry Controllers
app.get("/getLastEntry", entryController.getLastEntry);
app.get("/lastEntry", entryController.lastEntryDoc);
app.get("/newEntry", entryController.newEntryDoc);
app.get("/getEntry", entryController.getEntry);
app.get("/entry", entryController.entryDoc);

app.post("/addEntry", entryController.addNewEntry);

// Note Controllers
app.get("/getNotes", noteController.getNotes);
app.get("/newNote", noteController.newNoteDoc);

app.post("/addNote", noteController.addNewNote);
app.post("/addNoteConnect", noteController.addConnectNoteEvent);

// Theme Controllers
app.get("/getThemes", themeController.getThemes);
app.get("/themeList", themeController.getThemeList);
app.get("/getThemeDoc", themeController.getThemeDoc);
app.get("/getAddThemeDoc", themeController.getAddThemeDoc);
app.get("/getThemeEntry", themeController.getThemeEntry);

app.post("/addThemeConnect", themeController.addThemeConnect);
app.post("/addTheme", themeController.addTheme);

// Listening on PORT
app.listen(PORT, function() {
    console.log("Server listening on Port: " + PORT);
});