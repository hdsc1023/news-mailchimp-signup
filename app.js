var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
