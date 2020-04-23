var express=require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var db = require("./db.js");
var throttle = require("express-throttle");

const fs = require('fs');
var accesslog = null;
if (process.env["TEST_RESULT_LOG_FILE"] == null) {
    accesslog = 'log/access.log';
} else {
    accesslog = process.env["TEST_RESULT_LOG_FILE"];
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env["TEST_RESULT_USE_REVERSE_PROXY"] == null) {
    app.use(express.static(path.join(__dirname,'../public')));
}

var throttleOptions;
if (process.env["TEST_RESULT_THROTTLE_RATE"] == null) {
    throttleOptions = {
        "rate": "5/s"
    }
} else {
    throttleOptions = {
        "rate":process.env["TEST_RESULT_THROTTLE_RATE"]
    }
}

app.post('/query-result', throttle(throttleOptions), async function(req,res)
         {
             testid = req.body.testid;
             logmsg = testid + '\t' + new Date().toISOString() +'\n';
             fs.appendFile(accesslog, logmsg, (err) => {if (err) throw err;});

             try {
             const result = await db.getTestResult(testid);
                 console.log(req.body, result);

                 if (result == null) {
                     res.redirect('unknown-code.html');
                     return;
                 }
                 switch(result.result) {
                 case "positive":
                     res.redirect('positive.html');
                     break;
                 case "negative":
                     res.redirect('negative.html');
                     break;
                 case "inconclusive":
                     res.redirect('inconclusive.html');
                     break;
                 case "":
                     res.redirect('not-ready.html');
                     break;
                 default:
                     res.redirect('error.html');
                 };
             } catch(e) {
                 console.log(e);
             }
         });
PORT = process.env["TEST_RESULT_PORT"] || 1234;

var server=app.listen(PORT, function() {});
