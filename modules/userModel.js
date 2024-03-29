const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: db_url});

function getUserDataFromDB(id, callback) {
    console.log("Back from the getUserDataFromDB:" + id);
    
    var sql = "SELECT account_id_pk, account_name, entry_id_pk FROM eventAccount INNER JOIN eventEntry ON entry_acct_fk = account_id_pk WHERE account_id_pk = $1::int";
    var params = [id];
    
    pool.query(sql, params, function(error, db_results) {
        if (error) {
            throw error;
        } else {
            // console.log("db_reults: " + JSON.stringify(db_results));
            
            var results = { success: true, list: db_results.rows };
        
            console.log("Transfered to results: ", results);
            
            callback(null, results);
        }    
    });
}

module.exports = {
    getUserDataFromDB: getUserDataFromDB
};

/**************************************************************************
*
**************************************************************************/