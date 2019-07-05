const entryModel = require("../modules/entryModel.js");


function getLastEntry(request, response) {
    console.log("Retrieving Last Entry from SERVER.");
    
    
    
    entryModel.getLastEntryDB(function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });


module.exports = {
    getLastEntry: getLastEntry
    
};