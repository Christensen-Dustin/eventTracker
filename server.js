var express = require("express");
var app = express();

const { Pool } = require("pg");

// static directory
app.use(express.static('public'));

const connectionString = process.env.DATABASE_URL || "postgress://eventtrackuser:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: connectionString});

// VIEW
app.set('views', 'view');
app.set('view engine', 'ejs');
var port1 = 5000;
app.set("port", (process.env.PORT || port1));

app.get("/getPerson", getPerson);       // get entry
app.get("/getChildren", getChildren);   // get themes
app.get("/getParent", getParent);       // get notes

app.listen(app.get('port'), function() {
    console.log("Now listening for connections on port: " + app.get("port"));
});

function getPerson(request, response) {
    console.log("Getting Person information from SERVER.");
    
    var id = request.query.id;
    console.log("Retrieving person with id: ", id);
    
    getPersonFromDB(id, function(error, result) {
        console.log("Back from the getPersonFromDB function with result: ", result);
        
        if (error || result == null || result.length != 1) {
            response.status(500).json({success:false, data: error});
        } else {
            response.json(result);
        }
    });
};

function getChildren(request, response) {
    console.log("Getting Children information from SERVER.");
    
    var parent_FK = request.query.parent_FK;
    console.log("Retrieving person with id: ", parent_FK);
    
    getChildrenFromDB(parent_FK, function(error, result) {
        console.log("Back from the getChildrenFromDB function with result: ", result);
        
        if (error || result == null || result.length != 1) {
            response.status(500).json({success:false, data: error});
        } else {
            response.json(result);
        }
    });
};

function getParent(request, response) {
    console.log("Getting Parent information from SERVER.");
    
    var child_FK = request.query.child_FK;
    console.log("Retrieving person with id: ", child_FK);
    
    getParentFromDB(child_FK, function(error, result) {
        console.log("Back from the getParentFromDB function with result: ", result);
        
        if (error || result == null || result.length != 1) {
            response.status(500).json({success:false, data: error});
        } else {
            response.json(result);
        }
    });
};

function getPersonFromDB(id, callback) {
    console.log("getPersonFromDB called from id: ", id);
    
    var sql = "SELECT id, firstN, lastN, birthday FROM person WHERE id = $1::int";
    var params = [id];
    
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

function getChildrenFromDB(parent_FK, callback) {
    console.log("getChildrenFromDB called from id: ", parent_FK);
    
    var sql = "SELECT id, firstN, lastN, birthday FROM person INNER JOIN parent2child on child_FK = id WHERE parent_FK = $1::int";
    var params = [parent_FK];
    
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

function getParentFromDB(child_FK, callback) {
    console.log("getChildrenFromDB called from id: ", child_FK);
    
    var sql = "SELECT id, firstN, lastN, birthday FROM person INNER JOIN parent2child on parent_FK = id WHERE child_FK = $1::int";
    var params = [child_FK];
    
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