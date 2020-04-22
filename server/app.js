var express=require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var db = require("./db.js");
var throttle = require("express-throttle");

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
}

app.post('/query-result', throttle(throttleOptions), async function(req,res)
         {
             testid = req.body.testid;

             try {
             const result = await db.getTestResult(testid);
                 console.log(req.body, result);

                 if (result == null) {
                     res.redirect("error.html");
                     return;
                 }
                 switch(result.result) {
                 case "+":
                     res.redirect('positive.html');
                     break;
                 case "-":
                     res.redirect('negative.html');
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
