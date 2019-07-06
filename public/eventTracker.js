// Account-Database variables
var userID = 1;
var entryID = 0;


function loadUser() {
    console.log("Searching for User");
    
    console.log("Acct ID: " + userID);
    
    clearSection("user");
    
    $.get("/getUser",{id: userID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        var user = data.list[0];
        entryID = user.account_id_pk;
        
        $("#user").append("<b>Greetings: </b> " + user.account_name +
                              " --- <b>UserID: </b> " + entryID);
    });
}

function getLastEntry() {
    lastEntry();
    getThemes();
    getNotes();
    newNoteDoc();
}

function lastEntry() {
    console.log("Searching for last entry");
    
    console.log("Acct ID: " + userID);
    
    clearSection("entry");
    
    $.get("/getLastEntry",{id: userID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        for (var i = 0; i < data.list.length; i++) {
            var entry = data.list[i];
        
            $("#entry").append("<b>Entry Date:</b> " + entry.entry_date +
                              "<br><b>Entry Timeline:</b> " + entry.entry_timeline +
                              "<br><b>Entry Content:</b><br>" + entry.entry_content);
        }
    });
}

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