// Account-Database variables
var userID = 1;
var entryID = 0;
var count = 0;
// userData.userID = 1;

// Loads USER DATA
function loadUser() {
    console.log("Searching for User");
    
    console.log("Acct ID: " + userID);
    
    clearSection("user");
    
    $.get("/getUser",{id: userID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        for(var i = 0; i < data.list.length; i++) {
            var user = data.list[i];
        }
        
        entryID = user.entry_id_pk;
        // entryID = user[user.length - 1].entry_id_pk;
        
        $("#user").append("<b>Greetings: </b> " + user.account_name +
                              " --- <b>UserID: </b> " + user.account_id_pk);
    });
}

// Loads the Last Entry and assocciated data
function getLastEntry() {
    lastEntry();
    getThemes();
    getNotes();
    newNoteDoc();
}

// Grabs the last ENTRY
function lastEntry() {
    console.log("Searching for last entry");
    
    console.log("Acct ID: " + userID);
    
    clearSection("entry");
    
    $.get("/getLastEntry",{id: userID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        var entry = data.list[data.list.length - 1];
        // entryID = data.list[data.list.length - 1].entry_id_pk;
        
        console.log("entry.entry_id_pk: " + entry.entry_id_pk);
        console.log("entryID: " + entryID);
        
        // entryID = Number(entry.entry_id_pk);
        
        $("#entry").append("<b>Entry Date:</b> " + entry.entry_date +
                           "<br><b>Entry Timeline:</b> " + entry.entry_timeline +
                           "<br><b>Entry ID:</b> " + entry.entry_id_pk +
                           "<br><b>Entry Content:</b><br>" + entry.entry_content);
    });
}

// Gets THEMES associated with specified ENTRY
function getThemes() {
    console.log("Searching for Themes related to entry");
    
    console.log("Acct ID: " + userID);
    console.log("Entry ID: " + entryID);
    
    clearSection("theme");
    
    $.get("/getThemes",{id: userID, entry: entryID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
        
        var display = "<b>Theme:</b><table><tr>";
    
        for (var i = 0; i < data.list.length; i++) {
            var theme = data.list[i];
        
            display += "<td>(" + theme.theme_name + ")</td>";
        }
        
        display += "</tr></table>";
        
        $("#theme").append(display);
    });
}

// Gets NOTES associated with specified ENTRY
function getNotes() {
    console.log("Searching for Notes related to Entry");
    
    console.log("Acct ID: " + userID);
    console.log("Entry ID: " + entryID);
    
    clearSection("notes");
    
    $.get("/getNotes",{id: userID, entry: entryID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        for (var i = 0; i < data.list.length; i++) {
            var note = data.list[i];
        
            $("#notes").append("<b>Note Date:</b> " + note.note_date +
                              "<br><b>Note Content:</b><br>" + note.note_content + "<br>");
        }
    });
}

// Adds a NEW NOTE to a specified ENTRY
function addNewNote() {
    console.log("Searching for Notes related to Entry");
    
    console.log("Acct ID: " + userID);
    console.log("Entry ID: " + entryID);
            
    clearSection("notes");
    
    $.post("/newNote",{id: userID, entry: entryID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        
    });
}

function newNoteDoc() {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("addNote").innerHTML = request.responseText;
        }
    }
    
    request.open("GET", "/newNote", true);
    request.send();
}

function clearSection(sectionID) {
    
    var select = document.getElementById(sectionID);
    
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    return;
}