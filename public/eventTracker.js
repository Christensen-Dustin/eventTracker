// Account-Database variables
var userID = 1;
var entryID = 0;


function loadUser() {
    console.log("Searching for User");
    
    console.log("Acct ID: " + userID);
    
    $.get("/getUser",{id: userID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        var user = data.list;
        entryID = user.account_ID_PK;
        
        $("#user").append("<b>Greetings: </b> " + user.account_name +
                              " --- <b>UserID: </b> " + Number(user.account_ID_PK));
    });
}

function getLastEntry() {
    lastEntry();
    getThemes();
    // getNotes();
}

function lastEntry() {
    console.log("Searching for last entry");
    
    console.log("Acct ID: " + userID);
    
    $.get("/getLastEntry",{id: userID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        for (var i = 0; i < data.list.length; i++) {
            var entry = data.list[i];
        
            $("#entry").append("<b>Entry Date:</b> " + entry.entry_date +
                              "<br><b>Entry Timeline:</b> " + entry.entry_timeline +
                              "<br><b>Content:</b><br>" + entry.entry_content);
        }
    });
}

function getThemes() {
    console.log("Searching for Themes related to entry");
    
    console.log("Acct ID: " + userID);
    
    $.get("/getTheme",{id: userID, entry: entryID}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        for (var i = 0; i < data.list.length; i++) {
            var theme = data.list[i];
        
            $("#theme").append("<td>" + theme.theme_name + "<td>");
        }
    });
}

function newEntry() {
    
}