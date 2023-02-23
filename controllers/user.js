const User = require("../models/user");
const dbConnection = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, customApiError } = require("../errors");
const mongoose = require("mongoose");

//For establishing the connection.
const start_function = async () => {
  await dbConnection.connectDb(process.env.MONGO_URI).then((result) => {
    console.log(
      "Connected to Mongodb with =",
      result.connections[0]._connectionString
    );
  });
};

//Create new user
const createUser = async function (req, res) {
  try {
    await start_function();
    console.log("registered user entered with");
    const savedUser = await User.create({
      ...req.body,
    });
    if (savedUser) {
      res.set("Content-Type", "application/json");
      res.status(200).json(savedUser);
      //closing the connection
      mongoose.connection.close(function () {
        console.log(
          "MongoDb connection closed with readystate =",
          mongoose.connection.readyState
        );
      });
    }
  } catch (err) {
    console.log("error in creating user in createuser is = ", err.message);
    throw err;
  }
};

//get all Users
const getAllUsers = async function () {
  console.log("getall called");
};

module.exports = {
  createUser,
  getAllUsers,
};
