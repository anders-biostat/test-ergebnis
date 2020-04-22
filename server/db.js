// process.chdir("..")

const sqlite3 = require('sqlite3');
DB_PATH = process.env["TEST_RESULT_DB"] || "db/results.db";
let db = new sqlite3.Database(DB_PATH);

let getTestResult = function(testid) {
    const result = new Promise((res, rej) => {
        let select = "select id, result from results where id == ?";
        db.get(select, [testid], (err, row) => {
            if (err) {
                rej(err);
            } else {
                res({testid: row.id, result: row.result});
            }
        });
    });
    return result;
};



exports.getTestResult = getTestResult;
