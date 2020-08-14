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



// mongo-----------------------------------------------------------------------------------------------------

router.get("/api/:key?", function (request, response) {
    let keyParam = request.params.key;
 console.log(keyParam)

    const getAll = () => {
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
              const fileName = results;
              // for (let i = 0; i < fileName.length; i++) {
              //   const element = JSON.stringify(fileName[i].comment);
              //   console.log(element)
              // }
  
              // }
              db.close();
              response.json(
                {fileName}
              );
            });
        }
      );
    };
    getAll();
    // console.log(ok)
  });
module.exports = router;