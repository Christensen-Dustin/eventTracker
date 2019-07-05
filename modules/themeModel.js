const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: db_url});

function getThemesFromDB(id, entry, callback) {
    console.log("Back from the getThemeFromDB:" + id);
    console.log("Back from the getThemeFromDB:" + entry);
    
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

module.exports = {
    getThemesFromDB: getThemesFromDB
};