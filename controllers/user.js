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

//login of Admin
const adminLogin = async function (req, res) {
  await start_function();
  console.log("login admin entered;",req.body);
  const {email,password}  = req.body;
  if(!email || !password){
    throw new BadRequestError("Email and password shouldnt be empty.")
  }
  const user = await User.findOne({email});
  console.log("user is= ", user);
  if(!user){
    // throw new BadRequestError("Please provide email ");
    throw new BadRequestError("incorrect email ");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  // console.log("ispassword=", isPasswordCorrect);
  if (!isPasswordCorrect) {
    // throw new UnauthenticatedError("Invalid Credentials");
    throw new BadRequestError("Invalid password");
  }
  const token = user.createJWT();
  console.log("token=", token);
  res.status(StatusCodes.OK).json({user:{name:user.name}, token})
  mongoose.connection.close(function () {
    console.log(
      "MongoDb connection closed with readystate =",
      mongoose.connection.readyState
    );
  });
}; 


//Register new user
const createUser = async function (req, res) {
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
};

//get all Users
const getAllUsers = async function () {
  console.log("getall called");
};



module.exports = {
  createUser,
  adminLogin,
  getAllUsers,
};
