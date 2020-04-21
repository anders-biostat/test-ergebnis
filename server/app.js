var express=require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env["TEST_RESULT_USE_REVERSE_PROXY"] == null) {
    app.use(express.static(path.join(__dirname,'../public')));
}


app.post('/query-result',function(req,res)
        {
            if (req.body.testid === '+') {
                res.redirect('/positive.html');
            } else {
                res.redirect('/negative.html');
            }
            console.log(req.body);
        });
PORT = process.env["TEST_RESULT_PORT"] || 1234;

var server=app.listen(PORT, function() {});
