var express=require('express');
var path = require('path');
var app=express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile("index.html", {root: path.join(__dirname, 'public')});
});
app.get('/positive',function(req,res){
    res.sendFile("positive.html", {root: path.join(__dirname, 'public')});
});
app.get('/negative',function(req,res){
    res.sendFile("negative.html", {root: path.join(__dirname, 'public')});
});

app.post('/query-result',function(req,res)
        {
            if (req.body.testid === '+') {
                res.redirect('/positive');
            } else {
                res.redirect('/negative');
            }
            console.log(req.body);
        });
var server=app.listen(1234,function() {});
