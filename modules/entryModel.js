const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: db_url});

function getLastEntryFromDB(callback) {
    console.log("Back from the getLastEntryFromDB");
    
    var sql = "SELECT entry_ID_PK, entry_content, entry_date, entry_timeline, entry_acct_FK FROM eventEntry WHERE entry_acct_fk = 1";
    
    pool.query(sql, function(errror, db_results) {
        if (error || db_results == null || db_results.length < 1) {
            response.status(500).json({success:false, data: error});
        } else {
            // entryID = results[results.length - 1].entry_id_pk;
            // acct = results[results.length - 1].entry_acct_fk;
            var results = {ID: db_results[db_results.length - 1].entry_id_pk,
                            content: db_results[db_results.length - 1].entry_content,
                            date: db_results[db_results.length - 1].entry_date,
                            timeline: db_results[db_results.length - 1].entry_timeline,
                            accountID: db_results[db_results.length - 1].entry_acct_fk
                          };
        
            console.log("Transfered to results: ", results);
            
            callback(null, results);
        
        // response.writeHead(200, {"Content-Type": "application/json"});
        // response.render('lastEntry', params);
        // response.end();
    }    
});

module.exports = {
    getLastEntryFromDB: getLastEntryFromDB
    
};