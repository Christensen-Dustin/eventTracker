

function getLastEntryFromDB(callback) {
    console.log("Back from the getLastEntryFromDB function with result: ", result);
        
    if (error || results == null || results.length < 1) {
        response.status(500).json({success:false, data: error});
    } else {
        // var params = JSON.stringify(result);
        entryID = result[result.length - 1].entry_id_pk;
        acct = result[result.length - 1].entry_acct_fk;
        params = {ID: result[result.length - 1].entry_id_pk,
                      content: result[result.length - 1].entry_content,
                      date: result[result.length - 1].entry_date,
                      timeline: result[result.length - 1].entry_timeline,
                      accountID: result[result.length - 1].entry_acct_fk};
        
        console.log("Transfered to params: ", params);
        
        // response.writeHead(200, {"Content-Type": "application/json"});
        // response.render('lastEntry', params);
        // response.end();
    }
    
    callback(null, results);    
};

module.exports = {
    getLastEntryFromDB: getLastEntryFromDB
    
};