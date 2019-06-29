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
// app.get("/getPerson", getPerson);                   // get entry
// app.get("/getChildren", getChildren);               // get themes
// app.get("/getParent", getParent);                   // get notes

app.listen(app.get('port'), function() {
    console.log("Now listening for connections on port: " + app.get("port"));
});


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
    
    var query = request.query;
    console.log("Retrieving last entry: ", query);
    
    getLastEntryFromDB(query, function(error, result) {
        console.log("Back from the getLastEntryFromDB function with result: ", result);
        
        if (error || result == null || result.length < 1) {
            response.status(500).json({success:false, data: error});
        } else {
            // var params = JSON.stringify(result);
            var params = {id: result[result.length - 1].entry_id_pk,
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






