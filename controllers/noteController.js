const noteModel = require("../modules/noteModel.js");


function getNotes(request, response) {
    console.log("Retrieving Notes from SERVER.");
    
    var id = request.query.id;
    var entry = request.query.entry;
    
    console.log("ID: " + id +" ENTRY: " + entry);
    
    noteModel.getNotesFromDB(id, entry, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};

function newNote(request, response) {
    response.render('/newNote');
};


module.exports = {
    getNotes: getNotes,
    newNote: newNote
};