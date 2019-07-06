const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: db_url});

function getNotesFromDB(id, entry, callback) {
    console.log("Back from the getNotesFromDB ID:" + id);
    console.log("Back from the getNotesFromDB ENTRY:" + entry);
    
    var sql = "SELECT note_ID_PK, note_content, note_date,note_acct_FK From eventNote INNER JOIN eventNoteConnection ON note_ID_PK = connectN_FK inner join eventEntry on connectE_FK=entry_ID_PK where entry_ID_PK=$1::int AND note_acct_FK=$2::int";
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
    getNotesFromDB: getNotesFromDB
};