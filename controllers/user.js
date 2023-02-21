const User = require("../models/user");
const dbConnection = require("../db/connect");
const mongoose = require("mongoose");

//For establishing the connection.
const start_function = async () => {
  try {
    await dbConnection.connectDb(process.env.MONGO_URI).then((result) => {
      console.log(
        "Connected to Mongodb with =",
        result.connections[0]._connectionString
      );
    });
  } catch (err) {
    console.log("error in calling start_function in app.js", err);
    throw err;
  }
};

// start_function();

const login = async function (req, res) {
  console.log("login user entered;");
};

const registerUser = async function (req, res) {
  try {
    start_function().then(async () => {
      console.log("registered user entered with");
      const savedUser = await User.create({
        ...req.body,
      });
      if (savedUser) {
        console.log("generated record =", savedUser);
        res.set("Content-Type", "application/json");
        res.status(200).json(savedUser);

        //closing the connection
        mongoose.connection.close(function () {
          console.log(
            "connection closed with readystate =",
            mongoose.connection.readyState
          );
        });
      }
    });
  } catch (err) {
    console.log("Error in inserting in the db is= ", err.message);
    mongoose.connection.close(function () {
      console.log("Error came, connection closed with readystate =", mongoose.connection.readyState);
    });
    // throw err;
  }
};

module.exports = {
  registerUser,
  login,
};
