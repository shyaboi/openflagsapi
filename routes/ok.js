var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var router = express.Router();
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

router.get("/ok", function (request, response) {
 
              response.json(
               "ok")
              
            

    getAll();
    // console.log(ok)
  });
module.exports = router;