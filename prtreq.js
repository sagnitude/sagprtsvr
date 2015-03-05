var express = require('express');
var methodOverride = require('method-override');
var multer = require('multer');

var app = express();

app.use(methodOverride());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(multer());

app.get("/", function(req, res){
	console.log("GET root");
	console.log(getPrettyJson(req));
	res.send("OK");
});

app.get("/get", function(req, res){
	console.log("GET got");
	res.send(getPrettyJson(req));
});

app.post("/get", function(req, res){
	console.log("POST got");
	res.send(getPrettyJson(req));
});

var getPrettyJson = function(jsonObject) {
    return JSON.stringify(jsonObject, null, "\t");
};

app.listen(8996);

console.log("listening on port 8996");