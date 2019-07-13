/*************************************************************************
*   Account-Database variables
*************************************************************************/
var userID = 1;
var entryID = 0;
var count = 0;
// userData.userID = 1;


/*************************************************************************
*   Loads USER DATA
*************************************************************************/
function loadUser() {
    console.log("Searching for User");
    
    console.log("Acct ID: " + userID);
    
    clearSection("user");
    
    $.get("/getUser",{id: userID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        var user = data.list[0];
        
        entryID = user.entry_id_pk;
        // entryID = data.list[data.list.length - 1].entry_id_pk;
        
        $("#user").append("<b>Greetings: </b> " + user.account_name +
                              " --- <b>UserID: </b> " + user.account_id_pk);
    });
    
    loadThemeList();
    entryList();
}


/*************************************************************************
*   Loads the Last Entry and assocciated data
*************************************************************************/
function getLastEntry() {
    clearSection("workArea");
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("workArea").innerHTML = request.responseText;
            
            lastEntry();
            getThemes();
            getNotes();
            newNoteDoc();
        }
    }
    
    request.open("GET", "/lastEntry", true);
    request.send();
}


/*************************************************************************
*   Grab a list of notes
*************************************************************************/
function entryList() {
    console.log("Searching for all entries");
    
    var acct = userID;
    
    console.log("Acct ID: " + acct);
    
    clearSection("workArea");
    
    $.get("/getLastEntry",{id: acct}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
        
        var display = "";
        var count = 1;
        
        for(var i = 0; i < data.list.length; i++) {
            var entry = data.list[i];
            
            display += "<h2>Entry: #" + count + "</h2>" +
                "<b>Entry Date:</b> " + entry.entry_date +
                "<br><b>Entry Timeline:</b> " + entry.entry_timeline +
                "<br><b>Entry Content:</b><br>" + entry.entry_content +
                "<br>";
            
            console.log("entry.entry_id_pk: " + entry.entry_id_pk);
            console.log("entryID: " + entryID);
            
            count++;
        }
        
        $("#workArea").append(display);
    });
}


/*************************************************************************
*   Grabs the last ENTRY
*************************************************************************/
function lastEntry() {
    console.log("Searching for last entry");
    
    var acct = userID;
    
    console.log("Acct ID: " + acct);
    
    clearSection("entry");
    
    $.get("/getLastEntry",{id: acct}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        var entry = data.list[data.list.length - 1];
        
        console.log("entry.entry_id_pk: " + entry.entry_id_pk);
        console.log("entryID: " + entryID);
        
        var display = "<b>Entry Date:</b> " + entry.entry_date +
            "<br><b>Entry Timeline:</b> " + entry.entry_timeline +
            "<br><b>Entry Content:</b><br>" + entry.entry_content;
        
        var display2 = "<b>Entry Date:</b> " + data.list[data.list.length - 1].entry_date +
            "<br><b>Entry Timeline:</b> " + data.list[data.list.length - 1].entry_timeline +
            "<br><b>Entry Content:</b><br>" + data.list[data.list.length - 1].entry_content;
        
        // $("#entry").append(display);
        $("#entry").append(display2);
        
    });
}


/*************************************************************************
*   Gets THEMES associated with specified ENTRY
*************************************************************************/
function getThemes() {
    console.log("Searching for Themes related to entry");
    
    var acct = userID;
    var entry = entryID;
    
    console.log("Acct ID: " + acct);
    console.log("Entry ID: " + entry);
    
    clearSection("theme");
    
    $.get("/getThemes",{id: acct, entry: entry}, function(data) {
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


/*************************************************************************
*   Gets THEMES associated with specified ENTRY
*************************************************************************/
function getThemeSelect() {
    console.log("Generating Theme List");
    
    var id = userID;
    
    console.log("Loading Theme List for: " + id);
    
    clearSection("themeSelect");
    
    $.get("/themeList", {id: id}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
        
        var count = 0;
        var display = "";
    
        for (var i = 0; i < data.list.length; i++) {
            var theme = data.list[i];
            
            if(count == 5) {
                display += "<input type='checkbox' name='selectedTheme[]' value='" + 
                    theme.theme_id_pk + 
                    "'>" + theme.theme_name + "<br>";
                
                count = 0;
            } else {
                display += "<input type='checkbox' name='selectedTheme[]' value='" + 
                    theme.theme_id_pk + 
                    "'>" + theme.theme_name;
                
                count++;
            }
        }
        
        display += "</select>";
        
        $("#themeSelect").append(display);
    }
)}


/*************************************************************************
*   Gets NOTES associated with specified ENTRY
*************************************************************************/
function getNotes() {
    console.log("Searching for Notes related to Entry");
    
    var acct = userID;
    var entry = entryID
    
    console.log("Acct ID: " + acct);
    console.log("Entry ID: " + entry);
    
    clearSection("notes");
    
    $.get("/getNotes",{id: acct, entry: entry}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        for (var i = 0; i < data.list.length; i++) {
            var note = data.list[i];
        
            $("#notes").append("<b>Note Date:</b> " + note.note_date +
                              "<br><b>Note Content:</b><br>" + note.note_content + "<br><br>");
        }
    });
}


/*************************************************************************
*   Adds a NEW ENTRY
*************************************************************************/
function addEntry() {
    console.log("Adding New Entry");
    
    var acct = userID;
    
    var themes = document.getElementsByName("themeSelect").value;
    
    var date = document.getElementsByName("newEntryDate")[0].value;
    var time = document.getElementsByName("newEntryTime")[0].value;
    var content = document.getElementsByName("newEntry")[0].value.trim();
    
    
    console.log("Acct ID: " + acct);
    
    console.log("newThemes: " + themes);
    
    console.log("newEntryDate: " + date);
    console.log("newEntryTimeline: " + time);
    console.log("newEntryContent: " + content);
    
    var params = {id: acct, date: date, time: time, content: content};
    // clearSection("notes");
    
    $.post("/addEntry",params, function(data) {
        console.log ("Back from the server with:");
        console.log(data);
        
        var newEntry = data.list[0];
        
        var newEntryID = newEntry.entry_id_pk;
        
        addConnectThemeEvent(newEntryID, themes);
    });
}


/*************************************************************************
*   Add CONNECTION between THEME and EVENT
*************************************************************************/
function addConnectThemeEvent(entryID, themeList) {
    console.log("Adding THEMES related to Entry");
    
    var entry = entryID;
    var themes = themeList;
    
    console.log("Entry ID: " + entry);
    console.log("Themes: " + themes);
        
    clearSection("workArea2");
    
    for (var i = 0; i < themes.length; i++) {
        $.post("/addThemeConnect",{entry: entry, themes: themes[i]}, function(data) {
                console.log ("Back from the server with:");
                console.log(data);
        
                var newThemeConnect = data.list[0];
        });
    }
    
    entryList();
    newEntryDoc();
}


/*************************************************************************
*   Adds a NEW NOTE to a specified ENTRY
*************************************************************************/
function addNote() {
    console.log("Adding Note related to Entry");
    
    var acct = userID;
    var entry = entryID;
    var date = document.getElementsByName("newNoteDate")[0].value;
    var content = document.getElementsByName("newNote")[0].value.trim();
    
    console.log("Acct ID: " + acct);
    console.log("Entry ID: " + entry);
    console.log("newNoteDate: " + date);
    console.log("newNoteContent: " + content);
        
    clearSection("notes");
    
    $.post("/addNote",{id: acct, entry: entry, date: date, content: content},
           function(data) {
        console.log ("Back from the server with:");
        console.log(data);
        
        var newNote = data.list[0];
        
        var newNoteID = newNote.note_id_pk;
        
        addConnectNoteEvent(newNoteID);
        
    });
}


/*************************************************************************
*   Add CONNECTION between NOTE and EVENT
*************************************************************************/
function addConnectNoteEvent(noteID) {
    console.log("Adding Note related to Entry");
    
    var entry = entryID;
    var note = noteID;
    
    console.log("Entry ID: " + entry);
    console.log("Note ID: " + note);
        
    clearSection("notes");
    
    $.post("/addNoteConnect",{entry: entry, note: note},
           function(data) {
        console.log ("Back from the server with:");
        console.log(data);
        
        var newNoteConnect = data.list[0];
        
        getNotes();
        newNoteDoc();
    });
}


/*************************************************************************
*   Display the New Note Doc
*************************************************************************/
function newNoteDoc() {
    
    clearSection("workArea2");
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("workArea2").innerHTML = request.responseText;
        }
    }
    
    request.open("GET", "/newNote", true);
    request.send();
}


/*************************************************************************
*   Display the New Entry Doc
*************************************************************************/
function newEntryDoc() {
    
    clearSection("workArea2");
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("workArea2").innerHTML = request.responseText;
            
            getThemeSelect();
        }
    }
    request.open("GET", "/newEntry", true);
    request.send();
}


/*************************************************************************
*   Load Themes in Drop Down menu
*************************************************************************/
function loadThemeList() {
    console.log("Generating Theme List");
    
    var id = userID;
    
    console.log("Loading Theme List for: " + id);
    
    clearSection("themeList");
    
    $.get("/themeList", {id: id}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
        
        var display = "<b>Select Theme: </b><select>";
    
        for (var i = 0; i < data.list.length; i++) {
            var theme = data.list[i];
        
            display += "<option value=" + theme.theme_id_pk + ">" +
                theme.theme_name + "</option>";
        }
        
        display += "</select>";
        
        $("#themeList").append(display);
    }
)}


/*************************************************************************
*   Clear Sections by ID
*************************************************************************/
function clearSection(sectionID) {
    
    var select = document.getElementById(sectionID);
    
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    return;
}

/**************************************************************************
*
**************************************************************************/