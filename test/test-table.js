var sqlite = require("sqlite3");

dbase = new sqlite.Database("db/results.db");

sql = "INSERT INTO results VALUES (?, ?)";

res = [
    ["res1", "+"],
    ["res2", "-"],
    ["res3", "+"],
    ["res4", "-"],
    ["res5", "+"],
];
res.forEach((x) => dbase.run(sql, x));
