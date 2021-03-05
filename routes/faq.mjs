

  const faqs = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("Flags");
        var mysort = { vote: -1 };
        dbo
          .collection("faqs")
          .find({})
          .sort(mysort)
          .toArray(function (err, result) {
            if (err) throw err;
            const results = result.map((fakews) => {
              return fakews;
            });
            const faq = results;
            console.log(faq);
            db.close();
            response.json({
              faq: faq,
            });
          });
      }
    );
  };