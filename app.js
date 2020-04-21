var express=require('express');
var app=express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendfile("index.html");
});

app.post('/query-result',function(req,res)
        {
            res.send('Hello World!');
            console.log(req.body);
        });
var server=app.listen(1234,function() {});
