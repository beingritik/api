const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
const connectDb = (url) => {
  return mongoose.connect(url, {
    // useNewUrlParser: true,     ======NO LONGER NECESSARY TO write here
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  });
    // .then((client) => {
    //   // console.log("connected to mongo", client);
    //   // console.log("connected to mongo");
    // })
    // .catch((err) => {
    //   console.log("error in connecting database is:", err.message);
    // });
};

module.exports = {
  connectDb
};

// const getdb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found";
// };

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// let _db;
// const mongoConnect = (callback) => {
//   MongoClient.connect("mongodb://localhost:27017")
//     .then((client) => {
//       console.log("connected to mongo");
//       _db = client.db();
//       callback(client);
//     })
//     .catch((err) => {
//       console.log("error in connecting database is:", err.message);
//     });
// };

// const getdb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found";
// };

// module.exports = {
//   mongoConnect,
//   getdb,
// };

//     // "mongodb+srv://ritik:9cnEvghnmgIkN7S0@cluster0.dajjjde.mongodb.net/test"
