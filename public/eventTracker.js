function loadUser() {
    console.log("Searching for User");
    
    var id = 1;
    console.log("Acct ID: " + id);
    
    $.get("/getUser",{id: id}, function(data) {
        console.log ("Back from the server with: ");
        console.log(data);
    
        for (var i = 0; i < data.list.length; i++) {
            var user = data.list[i];
        
            $("#user").append("<b>Greetings: </b> " + user.account_name +
                              " --- <b>UserID: </b> " + Number(user.account_ID_PK));
        }
    });
}

function getLastEntry() {
    lastEntry();
    // notesAdditional();
}

function lastEntry() {
    console.log("Searching for last entry");
    
    var id = 1;
    console.log("Acct ID: " + id);
    
    $.get("/getLastEntry",{id: id}, function(data) {
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

function notesAdditional() {
    console.log("Searching for notes related to entry");
    
    var id = 1;
    console.log("Acct ID: " + id);
    
    $.get("/getLastEntry",{id: id}, function(data) {
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

function newEntry() {
    
}