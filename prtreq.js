var express = require('express');
var methodOverride = require('method-override');
var multer = require('multer');
var fs = require("fs");

var app = express();

app.use(methodOverride());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(multer());

app.get("/", function(req, res){
	console.log("GET root");
	// console.log(getPrettyJson(req));
	res.send("OK");
});

app.get("/get", function(req, res){
	// console.log("GET got");
	var h = req.headers;
	var p = req.params;
	var q = req.query;
	var rd = {
		"headers": h,
		"params": p,
		"query": q
	};
	console.log(getPrettyJson(rd));
	console.log("GET got");
	res.send(getPrettyJson(rd));
});

app.post("/get", function(req, res){
	// console.log("POST got");
	var h = req.headers;
	var p = req.params;
	var q = req.query;
	var rd = {
		"headers": h,
		"params": p,
		"query": q
	};
	console.log(getPrettyJson(rd));
	console.log("POST got");
	res.send(getPrettyJson(rd));
});

app.get("/add", function(req, res){
	fs.readFile("./adder.html", function(err, html) {
		var h = req.headers;
		var p = req.params;
		var q = req.query;
		var rd = {
			"headers": h,
			"params": p,
			"query": q
		};
		var jsonString = JSON.stringify(rd);
		var predefine = "<script>var rd = "+jsonString+"</script>";
		res.send(predefine + html);
	});
});

var getPrettyJson = function(jsonObject) {
    return JSON.stringify(jsonObject, null, "<br>\t");
};

app.listen(8996);

console.log("listening on port 8996");