const themeModel = require("../modules/themeModel.js");


function getThemes(request, response) {
    console.log("Retrieving Themes from SERVER.");
    
    var id = request.query.id;
    var entry = request.query.entry;
    
    themeModel.getThemesFromDB(id, entry, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};


module.exports = {
    getThemes: getThemes
    
};