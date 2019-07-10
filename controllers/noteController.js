const noteModel = require("../modules/noteModel.js");

// Get NOTES related to specified ENTRY
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

// Adding New Page to Work Space
function newNote(request, response) {
    console.log("From noteController.newNote()")
    
    response.writeHead(200, {"Content-type": "html/text"});
    response.render();
    response.end();
};

// Add New Note to DATABASE
function addNewNote(request, response) {
    console.log("Preparing to ADD NEW NOTE to SERVER.");
    
    var id = request.body.id;
    var entry = request.body.entry;
    var newDate = request.body.date;
    var newNote = request.body.content;
    
    console.log(request);
    console.log("ID: " + id +" ENTRY: " + entry);
    console.log("NEWDATE: " + newDate +" NEWNOTE: " + newNote);
    
    noteModel.addNewNoteToDB(id, entry, newDate, newNote, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        console.log(JSON.stringify(results));
        
        response.json(results);
    });
};

// Add Connection between NOTE and EVENT
function addConnectNoteEvent(request, response) {
    console.log("Preparing to ADD Connect for Event and Note to SERVER.");
    
    var eventID = Number(request.body.entry);
    var noteID = Number(request.body.note);
    
    console.log("EntryID " + eventID);
    console.log("NoteID: " + noteID);
    
    noteModel.addConnectNoteEventToDB(eventID, noteID, function(error, results) {
        if(error) {
            console.log(error);
        }
        
        response.json(results);
    });
};


module.exports = {
    getNotes: getNotes,
    newNote: newNote,
    addNewNote: addNewNote,
    addConnectNoteEvent: addConnectNoteEvent
};