var sqlite = require("sqlite3");

dbase = new sqlite.Database("db/results.db");

sql = "INSERT INTO results (id, result) VALUES (?, ?)";

res = [
    ["pos", "positive"],
    ["neg", "negative"],
    ["inc", "inconclusive"],
    ["empty", ""],
    ["res5", "positive"],
];
res.forEach((x) => dbase.run(sql, x));
