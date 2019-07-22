const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

// Connection String
const pool = new Pool({connectionString: db_url});


/**************************************************************************
*   Get Themes for a specified ENTRY
**************************************************************************/
function getThemesFromDB(id, entry, callback) {
    console.log("Back from the getThemeFromDB ID:" + id);
    console.log("Back from the getThemeFromDB ENTRY:" + entry);
    
    var sql = "SELECT theme_ID_PK, theme_name, theme_acct_FK From eventTheme INNER JOIN eventThemeConnection ON theme_ID_PK = connectT_FK inner join eventEntry on connectE_FK=entry_ID_PK where entry_ID_PK=$1::int AND theme_acct_FK=$2::int";
    var params = [entry, id];
    
    pool.query(sql, params, function(error, db_results) {
        if (error) {
            throw error;
        } else {
            
            var results = { success: true, list: db_results.rows };
        
            console.log("Transfered to results: ", results);
            
            callback(null, results);
        }    
    });
}


/**************************************************************************
*   Get list of Themes from DATABASE
**************************************************************************/
function getThemeListFromDB(id, callback) {
    console.log("Back from the getThemeListFromDB ID: " + id);
    
    var sql = "SELECT * FROM eventTheme WHERE theme_acct_FK = $1::int";
    var params = [id];
    
    pool.query(sql, params, function(error, db_results) {
        if(error) {
            throw error;
        } else {
            
            var results = { success: true, list: db_results.rows };
            
            callback(null, results);
        }
    });
}


/**************************************************************************
*   Insert NEW THEMES into the DATABASE to a specific ENTRY
**************************************************************************/
function addConnectThemeEventToDB(eventID, themeIdList, callback) {
    
    console.log("Back from the addConnectNoteEventToDB EventID:" + eventID);
    console.log("Back from the addConnectNoteEventToDB ThemeList:" + themeIdList);
    
    var sql = "INSERT INTO  eventThemeConnection (connectE_FK, connectT_fk)" +
        "VALUES ($1::int, $2::int) RETURNING theme_id_pk";
    var params = [eventID, noteID];    
    
    pool.query(sql, params, function(error, db_results) {
        if (error) {
            throw error;
        } else {
            
            var results = { success: true, list: db_results.rows };
        
            console.log("Transfered to results: ", results);
            
            callback(null, results);
        }    
    });
}


/**************************************************************************
*   Insert NEW THEMES into the DATABASE to a specific ENTRY
**************************************************************************/
function addThemeToDB(userID, eventID, theme, callback) {
    
    console.log("Going to DB with User ID: " +userID);
    console.log("Going to DB with Event ID:" + eventID);
    console.log("Going to DB with Theme:" + theme);
    
    var sql = "INSERT INTO  eventTheme (theme_name, theme_acct_fk)" +
        "VALUES ($1::text, $2::int)";
    var params = [theme, userID];    
    
    pool.query(sql, params, function(error, db_results) {
        if (error) {
            throw error;
        } else {
            
            var results = { success: true, list: db_results.rows };
        
            console.log("Transfered to results: ", results);
            
            callback(null, results);
        }    
    });
}


/**************************************************************************
*   Exported MODULES
**************************************************************************/
module.exports = {
    getThemesFromDB: getThemesFromDB,
    getThemeListFromDB: getThemeListFromDB,
    addConnectThemeEventToDB: addConnectThemeEventToDB,
    addThemeToDB: addThemeToDB
};

/**************************************************************************
*
**************************************************************************/