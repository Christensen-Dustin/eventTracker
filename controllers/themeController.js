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
*   Modules to be Exported
**************************************************************************/
module.exports = {
    getThemes: getThemes,
    getThemeList: getThemeList,
    addThemeConnect: addThemeConnect
};

/**************************************************************************
*
**************************************************************************/