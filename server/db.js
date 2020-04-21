// process.chdir("..")

const sqlite3 = require('sqlite3');
DB_PATH = process.env["TEST_RESULT_DB"] || "db/results.db";
let db = new sqlite3.Database(DB_PATH);

let getTestResult = function(testid, cb) {
    let select = "select id, result from results where id == ?";
    var result = null;
    db.get(select, [testid], (err, row) => {
        if (err) {
            throw err;
        }
        return cb({testid: row.id, result: row.result});
    });
    return result;
};



exports.getTestResult = getTestResult;
