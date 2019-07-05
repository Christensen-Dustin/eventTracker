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
        
            $("entry").append("<b>Entry Date:</b> " + entry.date +
                              "<br><b>Entry Timeline:</b> " + entry.timeline +
                              "<br><b>Content:</b><br>" + entry.content);
        }
    });
    
    
/** 

    var results = {ID: db_results[db_results.length - 1].entry_id_pk,
                            content: db_results[db_results.length - 1].entry_content,
                            date: db_results[db_results.length - 1].entry_date,
                            timeline: db_results[db_results.length - 1].entry_timeline,
                            accountID: db_results[db_results.length - 1].entry_acct_fk
                          };
                          
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("entry").innerHTML = request.responseText;
        }
    }
    request.open("GET", "/getLastEntry", true);
    request.send();
*/
}

function notesAdditional() {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("notes").innerHTML = request.responseText;
        }
    }
    request.open("GET", "/getNote", true);
    request.send();
}

function newEntry() {
    
}