var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var router = express.Router();
var PORT = process.env.port || 4444;
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
// mongo-----------------------------------------------------------------------------------------------------
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
const donus = process.env.MONGO_THING;
const mongoDB = `mongodb+srv://shyaboi:${donus}@cluster0.zqw64.azure.mongodb.net/donu?retryWrites=true&w=majority`;



var NewPost = new Schema({
    link:String,
    // region:String
  });
  
  
  var Model = mongoose.model("NewPost", NewPost);


app.post("/postflag", (request, response) => {
    var regionName =[]

    var arrayOfFiles = fs.readdirSync("./public/usa/region");
    var regionName =JSON.stringify(arrayOfFiles)
    const thing = arrayOfFiles.map((link) => {
    // let  donus = link.slice(0,-4)
    // regionName= donus.split(" ")
    return link
    });
    const thing2 = arrayOfFiles.map((link) => {
        let  region = link.slice(0,-4)
        // regionName= donus.split(" ")
        return {region}
        });
     
    console.log(thing)   
    // const mongoModle = new Model({
    // link:arrayOfFiles,
    // region:thing
    // });
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("Flags");
        // var myobj = mongoModle;
        dbo.collection("flag").insertMany([thing,thing2], function (err, res) {
          if (err) throw err;
          console.log("\x1b[36m", "1 document inserted");
          db.close();
        });
      }
    );
    setTimeout(() => {
      response.redirect(`/`);
    }, 300);
  });
  

  module.exports = app;





  app.post("/postflag", (request, response) => {
    var regionName =[]

    var arrayOfFiles = fs.readdirSync("./public/usa/region");
    // var regionName =JSON.stringify(arrayOfFiles)
    const thing = arrayOfFiles.map((link) => {
    let  region = link.slice(0,-4)
    const ok= link
    let country="usa"
    const ID = uuidv4()
    return {link,region,country,ID}
    });
 
        // console.log(thing)   
        // const mongoModle = new Model({
            // link:arrayOfFiles,
            // region:thing
            // });
            
            // let benix=[{link:thing},{region:thing2}]
            console.log(thing)
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("Flags");
        // var myobj = mongoModle;
        dbo.collection("flag").insertMany(thing, function (err, res) {
          if (err) throw err;
          console.log("\x1b[36m", "1 document inserted");
          db.close();
        });
      }
    );
    setTimeout(() => {
      response.redirect(`/`);
    }, 300);
  });