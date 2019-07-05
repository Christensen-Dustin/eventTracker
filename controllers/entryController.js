const entryModel = require("../modules/entryModel.js");


function getLastEntry(request, response) {
    console.log("Retrieving Last Entry from SERVER.");
    
    var id = request.query.id;
    
    entryModel.getLastEntryFromDB(id, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};


module.exports = {
    getLastEntry: getLastEntry
    
};