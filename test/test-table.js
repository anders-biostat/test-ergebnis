var sqlite = require("sqlite3");

dbase = new sqlite.Database("db/results.db");

sql = "INSERT INTO results (id, result) VALUES (?, ?)";

res = [
    ["positive", "positive"],
    ["negative", "negative"],
    ["inconclusive", "inconclusive"],
    ["empty", ""],
    ["res5", "positive"],
];
res.forEach((x) => dbase.run(sql, x));
