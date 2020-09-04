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
const { v4: uuidv4 } = require("uuid");

// mongo-----------------------------------------------------------------------------------------------------
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
const donus = process.env.MONGO_THING;
const mongoDB = `mongodb+srv://shyaboi:${donus}@cluster0.zqw64.azure.mongodb.net/donu?retryWrites=true&w=majority`;

// mongo-----------------------------------------------------------------------------------------------------

// routes--------------------------------------------------------------------------------------------------
var home = require("./routes/home");
app.use(express.static(__dirname + "./public/"));

// coooooooooooooooooorrrrrrrrrrrrrrrrrrrrrrrrrssssssssssssssssssssssssssssss

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// coooooooooooooooooorrrrrrrrrrrrrrrrrrrrrrrrrssssssssssssssssssssssssssssss


// var NewPost = new Schema({
  //   link:String,
  //   country:String
  //   region:String
  // });
app.get("/api/docs", (request, response) => {
  response.sendFile(path.join(__dirname + '/readme.md'));
})


app.get("/", (request, response) => {
   
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



  app.get("/rando", (request, response) => {
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

          const results = result.map((wall) => {
            return wall;
          });
        let dinus =  Math.floor(Math.random() * results.length)
        console.log(dinus)
          const randoLink = results[dinus].directLink;
          // console.log(randoLink)
          db.close();
          response.json(randoLink);
        });
    }
  );
};
gertAll();
// console.log(ok)
});


// app.post("/postflags", (request, response) => {
//   var regionName = [];

//   var arrayOfFiles = fs.readdirSync("./public/usa/region");
//   // var regionName =JSON.stringify(arrayOfFiles)
//   const thing = arrayOfFiles.map((links) => {
//     let region = links.slice(0, -4);
//     let country = "usa";
//     let directLink =
//       "https://flagapi.ngrok.io/" + country + "/region/" + region + ".svg";
//     const quickLink = region + ".svg";
//     // const ID = uuidv4()
//     return { directLink, quickLink, region, country };
//   });

  // console.log(thing)
  // const mongoModle = new Model({
  // link:arrayOfFiles,
  // region:thing
  // });

  // let benix=[{link:thing},{region:thing2}]
//   console.log(thing);
//   MongoClient.connect(
//     mongoDB,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function (err, db) {
//       if (err) throw err;
//       var dbo = db.db("Flags");
//       // var myobj = mongoModle;
//       dbo.collection("flag").insertMany(thing, function (err, res) {
//         if (err) throw err;
//         console.log("\x1b[36m", "flags posted!");
//         db.close();
//       });
//     }
//   );
//   setTimeout(() => {
//     response.redirect(`/`);
//   }, 300);
// });

// app.use("/", home);
// routes--------------------------------------------------------------------------------------------------
app.get("/api/:country/:region?", function (request, response) {
  let keyParam = request.params.region;
  console.log(request.params);

  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("Flags");
        var mysort = { region: 1 };
        dbo
          .collection("flag")
          .find({ region: keyParam })
          .sort(mysort)
          .toArray(function (err, result) {
            if (err) throw err;
            const results = result.map((wall) => {
              return wall;
            });
            const flagInfo = results;
            db.close();
            response.json({ flagInfo });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});

// dns call to server
require("dns").lookup(require("os").hostname(), function (err, add, fam) {
  console.log("addr: " + add);
});
//   express app listen and console log on post started
app.listen(PORT);
console.log("server started on " + PORT);
