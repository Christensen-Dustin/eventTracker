const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: db_url});

function getLastEntryFromDB(id, callback) {
    console.log("Back from the getLastEntryFromDB:" + id);
    
    var sql = "SELECT entry_ID_PK, entry_content, entry_date, entry_timeline, entry_acct_FK FROM eventEntry WHERE entry_acct_fk = $1::int";
    var params = [id];
    
    pool.query(sql, params, function(error, db_results) {
        if (error) {
            throw error;
        } else {
            
            var results = { success: true, list: db_results.rows };
            
            console.log("Transfered to db_results.rows: ", db_results.rows);
        
            console.log("Transfered to results: ", results);
            
            callback(null, results);
        }    
    });
}

module.exports = {
    getLastEntryFromDB: getLastEntryFromDB
};
    