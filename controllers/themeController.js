const themeModel = require("../modules/themeModel.js");


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

// Get List of Themes
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


module.exports = {
    getThemes: getThemes,
    getThemeList: getThemeList    
};