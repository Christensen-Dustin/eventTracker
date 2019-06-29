var express = require("express");
var app = express();

const { Pool } = require("pg");

// static directory
app.use(express.static('public'));

const connectionString = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: connectionString});

// VIEW
app.set('views', 'view');
app.set('view engine', 'ejs');
var port1 = 5000;
app.set("port", (process.env.PORT || port1));

// app.get("/eventTracker_home.html", gatherInfo);     // Preparation
app.get("/getLastEntry", getLastEntry);             // get the last entry
app.get("/getNote", getNote);
// app.get("/getPerson", getPerson);                   // get entry
// app.get("/getChildren", getChildren);               // get themes
// app.get("/getParent", getParent);                   // get notes

app.listen(app.get('port'), function() {
    console.log("Now listening for connections on port: " + app.get("port"));
});

// global variables
var entryID = 0;
var acct = 0;


// gather info from the database
function gatherInfo(request, response) {
    console.log("Gathering information from SERVER.");
    
    var query = request.query;
    console.log("Retrieving person with id: ", query);
    
    gatherInfoFromDB(query, function(error, result) {
        console.log("Back from the getInfoFromDB function with result: ", result);
        
        if (error || result == null || result.length < 1) {
            response.status(500).json({success:false, data: error});
        } else {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.render('theme', result);
            response.end();
        }
    });
};


// Load the last entry
function getLastEntry(request, response) {
    console.log("Retrieving Last Entry from SERVER.");
    
    var params = {};
    
    var query = request.query;
    console.log("Retrieving last entry: ", query);
    
    getLastEntryFromDB(query, function(error, result) {
        console.log("Back from the getLastEntryFromDB function with result: ", result);
        
        if (error || result == null || result.length < 1) {
            response.status(500).json({success:false, data: error});
        } else {
            // var params = JSON.stringify(result);
            entryID = result[result.length - 1].entry_id_pk;
            acct = result[result.length - 1].entry_acct_fk;
            params = {ID: result[result.length - 1].entry_id_pk,
                          content: result[result.length - 1].entry_content,
                          date: result[result.length - 1].entry_date,
                          timeline: result[result.length - 1].entry_timeline,
                          accountID: result[result.length - 1].entry_acct_fk};
            
            console.log("Transfered to params: ", params);
            
            // response.writeHead(200, {"Content-Type": "application/json"});
            response.render('lastEntry', params);
            response.end();
        }
    });
};


// Get notes
// Load the last entry
function getNote(request, response) {
    console.log("Retrieving Last Entry from SERVER.");
    
    var params = {};
    
    var query = request.query;
    console.log("Retrieving last entry: ", query);
    
    getNoteFromDB(query, entryID, acct, function(error, result) {
        console.log("Back from the getLastEntryFromDB function with result: ", result);
        
        if (error || result == null || result.length < 1) {
            response.status(500).json({success:false, data: error});
        } else {
            var paramsADD = {};
            for(var index = 0; index < result.length; index++){
                paramsADD += {noteID: result[index].note_id_pk,
                          noteContent: result[index].note_content,
                          noteDate: result[index].note_date};
            }
            
            console.log("Transfered to paramsADD: ", paramsADD);
            response.render('Notes', paramsADD);
            response.end();
        }
    });
};


// Gathers information from DATABASE
function gatherInfoFromDB(account, callback) {
    console.log("getPersonFromDB called from id: ", account);
    
    var sql = "SELECT theme_id_pk, theme_name, theme_acct_fk FROM eventTheme WHERE theme_acct_fk = 1";
    var params = [account];
    
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("An error with the DB: ");
            console.log(err);
            callback(err, null);
        };
        
        console.log("Found DB result: " + JSON.stringify(result.rows));
        
        callback(null, result.rows);
        
    });
};


// Getting the last entry from the DATABASE
function getLastEntryFromDB(query, callback) {
    console.log("getLastEntryFromDB called from id: ", query);
    
    var sql = "SELECT entry_ID_PK, entry_content, entry_date, entry_timeline, entry_acct_FK FROM eventEntry WHERE entry_acct_fk = 1";
    //var params = [query]; pool.query(sql, params, function(err, result)
    
    pool.query(sql, function(err, result) {
        if (err) {
            console.log("An error with the DB: ");
            console.log(err);
            callback(err, null);
        };
                
        console.log("Found DB result: " + JSON.stringify(result.rows));
        
        callback(null, result.rows);
        
    });
};


// Get a note from the DATABASE
function getNoteFromDB(query, id, acct, callback) {
    console.log("getLastEntryFromDB called from id: ", query);
    
    var sql = "SELECT note_id_pk, note_content, note_date, note_acct_fk FROM eventnote INNER JOIN eventNoteConnection ON note_id_pk = connectN_FK WHERE note_id_pk = $1::int AND note_acct_fk = $2::int";
    var params = [id, acct];
    
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("An error with the DB: ");
            console.log(err);
            callback(err, null);
        };
                
        console.log("Found DB result: " + JSON.stringify(result.rows));
        
        callback(null, result.rows);
        
    });
};



