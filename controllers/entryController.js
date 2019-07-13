const entryModel = require("../modules/entryModel.js");


/**************************************************************************
*   Retreives Last Entry
**************************************************************************/
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


/**************************************************************************
*   Pulls up Page to display the Last Entry
**************************************************************************/
function lastEntryDoc(request, response) {
    response.render('lastEntry');
}


/**************************************************************************
*   Pulls up Page to receive the New Entry
**************************************************************************/
function newEntryDoc(request, response) {
    
    response.render('newEntry');
};


/**************************************************************************
*   Add New Note to DATABASE
**************************************************************************/
function addNewEntry(request, response) {
    console.log("Preparing to ADD NEW NOTE to SERVER.");
    
    var id = request.body.id;
    var newTime = request.body.time;
    var newDate = request.body.date;
    var newNote = request.body.content;
    
    // console.log(request);
    console.log("ID: " + id);
    console.log("NEWTimeLine: " + newTime);
    console.log("NEWDATE: " + newDate);
    console.log("NEWNOTE: " + newNote);
    
    noteModel.addNewEntryToDB(id, newTime, newDate, newNote, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        console.log(JSON.stringify(results));
        
        response.json(results);
    });
};


/**************************************************************************
*   Modules to Export
**************************************************************************/
module.exports = {
    getLastEntry: getLastEntry,
    lastEntryDoc: lastEntryDoc,
    newEntryDoc: newEntryDoc,
    addNewEntry: addNewEntry
};

/**************************************************************************
*
**************************************************************************/