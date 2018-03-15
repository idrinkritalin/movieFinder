// SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

// DEFINE ASSETS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//// ROUTE
// GET
app.get("/", function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data : data});
        }
    });
});

app.get("*", function(req, res){
    res.render("404");
});

// LISTENING
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started on port 8080, my Master!")
});
