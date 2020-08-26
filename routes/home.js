var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var router = express.Router();
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


// mongo-----------------------------------------------------------------------------------------------------
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
const donus = process.env.MONGO_THING;
const mongoDB = `mongodb+srv://shyaboi:${donus}@cluster0.zqw64.azure.mongodb.net/donu?retryWrites=true&w=majority`;

// ---------------------------get/fetch for rando pic from this server
const fetch = require('node-fetch');





// mongo-----------------------------------------------------------------------------------------------------

router.get("/", (request, response) => {
  var donus
  fetch('http://localhost:4444/rando')
  .then(res => res.text())
  .then(body => console.log(body));
 
    const ipp = request.header("x-forwarded-for") || request.connection.remoteAddress;
    const ip = ipp.slice(7);
    console.log("ip1:" + ip);
    const gertAll = () => {
      MongoClient.connect(
        mongoDB,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (err, db) {
          if (err) throw err;
          var dbo = db.db("Flags");
          var mysort = {region:1}
          dbo
            .collection("flag")
            .find({})
            .sort(mysort)
            .toArray(function (err, result) {
              if (err) throw err;
              // for (let i = 0; i < result.length; i++) {
              //   const all = result[i];
              // console.log("\x1b[35m", element.name);
              // var getAl = all.name
              // console.log(getAl)
              const results = result.map((wall) => {
                return wall;
              });
              const flagInfo = results;
              // for (let i = 0; i < flagInfo.length; i++) {
              //   const element = JSON.stringify(flagInfo[i].comment);
              //   console.log(element)
              // }
  
              // }
         
              db.close();

              response.render(`home`, {
                flagInfo: flagInfo,
              });
            });
        }
      );
    };
    gertAll();
    // console.log(ok)
  });

  router.get("/ok", function (request, response) {
 
    response.json(
     "ok")
});
module.exports = router;