var express=require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var db = require("./db.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env["TEST_RESULT_USE_REVERSE_PROXY"] == null) {
    app.use(express.static(path.join(__dirname,'../public')));
}


app.post('/query-result',async function(req,res)
         {
             testid = req.body.testid;
             // var result = null;

             // const result = await
             const result = await db.getTestResult(testid);//.then((x) => result = x);
             // promise.then(() => {
             console.log(result);
             switch(result.result) {
             case "+":
                 res.redirect('/positive.html');
                 break;
             case "-":
                 res.redirect('/negative.html');
                 break;
             default:
                 res.redirect('/error.html');
             };
             console.log(req.body);
             // });
             //promise.catch((err) => console.log(err));
         });
PORT = process.env["TEST_RESULT_PORT"] || 1234;

var server=app.listen(PORT, function() {});
