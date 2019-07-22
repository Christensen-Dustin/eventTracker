const themeModel = require("../modules/themeModel.js");


/**************************************************************************
*   Retrieves Themes from DATABASE
**************************************************************************/
function getThemes(request, response) {
    console.log("Retrieving Themes from SERVER.");
    
    var id = request.query.id;
    var entry = request.query.entry;
    
    console.log("ID: " + id +" ENTRY: " + entry);
    
    themeModel.getThemesFromDB(id, entry, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};


/**************************************************************************
*   Get List of Themes
**************************************************************************/
function getThemeList(request, response) {
    console.log("Retrieving List of Themes");
    
    var id = request.query.id;
    
    console.log("ID: " + id);
    
    themeModel.getThemeListFromDB(id, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};


/**************************************************************************
*   Connects THEMES to a specified EVENT/ENTRY
**************************************************************************/
function addThemeConnect(request, response) {
    console.log("Preparing to ADD Connect for Event and THEMES to SERVER.");
    
    var eventID = request.body.entry;
    var themeList = request.body.themes;
    
    console.log("Event ID: " + eventID);
    console.log("Theme List: " + themeList);
    
    noteModel.addConnectThemeEventToDB(eventID, themeList, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
    
};


/**************************************************************************
*   Pulls up Page to look at Themes linked to this account
**************************************************************************/
function getThemeDoc(request, response) {
    
    response.render('themeDoc');
};



/**************************************************************************
*   Pulls up Page to ADD a theme to this account
**************************************************************************/
function getAddThemeDoc(request, response) {
    
    response.render('addThemeDoc');
};


/**************************************************************************
*   ADDs THEME to specified account
**************************************************************************/
function addTheme(request, response) {
    console.log("Preparing to ADD THEME to SERVER.");
    
    var userID = request.body.id;
    var eventID = request.body.entry;
    var theme = request.body.theme;
    
    console.log("User ID: " + userID);
    console.log("Event ID: " + eventID);
    console.log("Theme: " + theme);
    
    themeModel.addThemeToDB(userID, eventID, theme, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};


/**************************************************************************
*   Modules to be Exported
**************************************************************************/
module.exports = {
    getThemes: getThemes,
    getThemeList: getThemeList,
    addThemeConnect: addThemeConnect,
    getThemeDoc: getThemeDoc,
    getAddThemeDoc: getAddThemeDoc,
    addTheme: addTheme
};

/**************************************************************************
*
**************************************************************************/