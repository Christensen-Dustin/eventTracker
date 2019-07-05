const { Pool } = require("pg");

// Referred to as the connectionString
const db_url = process.env.DATABASE_URL || "postgress://et_user:elijah@localhost:5432/eventtracker";

const pool = new Pool({connectionString: db_url});

function getLastEntryFromDB(callback) {
    console.log("Back from the getLastEntryFromDB");
        
    if (error || results == null || results.length < 1) {
        response.status(500).json({success:false, data: error});
        
    } else {
        
        entryID = results[results.length - 1].entry_id_pk;
        acct = results[results.length - 1].entry_acct_fk;
        params = {ID: results[results.length - 1].entry_id_pk,
                      content: results[result.length - 1].entry_content,
                      date: results[results.length - 1].entry_date,
                      timeline: results[results.length - 1].entry_timeline,
                      accountID: results[results.length - 1].entry_acct_fk};
        
        console.log("Transfered to params: ", params);
        
        // response.writeHead(200, {"Content-Type": "application/json"});
        // response.render('lastEntry', params);
        // response.end();
    }
    
    callback(null, params);    
};

module.exports = {
    getLastEntryFromDB: getLastEntryFromDB
    
};