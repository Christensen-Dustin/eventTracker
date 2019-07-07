const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

// Connection String
const pool = new Pool({connectionString: db_url});

// Get Themes for a specified ENTRY
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

// Get list of Themes from DATABASE
function getThemeListFromDB(id, callback) {
    console.log("Back from the getThemeListFromDB ID: " + id);
    
    var sql = "SELECT theme_id_pk, theme_name, theme_acct_fk" +
        "FROM eventTheme WHERE theme_acct_FK = $1::int";
    var params = [id];
    
    pool.query(sql, params, function(error, db_results) {
        if(error) {
            throw error;
        } else {
            
            var results = { success: true, list: db_results};
            
            callback(null, results);
        }
    });
}

// Exported MODULES
module.exports = {
    getThemesFromDB: getThemesFromDB,
    getThemeListFromDB: getThemeListFromDB
};