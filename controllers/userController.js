const entryModel = require("../modules/userModel.js");


function getUserData(request, response) {
    console.log("Retrieving User DATA from SERVER.");
    
    var id = request.query.id;
    
    entryModel.getUserDataFromDB(id, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};


module.exports = {
    getUserData: getUserData    
};