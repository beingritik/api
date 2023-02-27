const User = require("../models/user");
const Student = require("../models/student");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, customApiError } = require("../errors");
const mongoose = require("mongoose");
const databaseVar = require("../db/database");

//Create new user
const createUser = async function (req, res) {
  try {
    console.log("registered student entered with");
    await databaseVar.database_connection();
    const savedUser = await User.create({
      ...req.body,
    });
    if (savedUser) {
      res.set("Content-Type", "application/json");
      res.status(200).json(savedUser);
      //closing the connection
      databaseVar.database_disconnect();
    }
  } catch (err) {
    console.log("error in creating user in createuser is = ", err.message);
    throw err;
  }
};

//create student thru UserId
const createStudent = async function (req, res) {
  try {
    console.log("creation of student entered with = ", req.params.id);
    const validuserId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (validuserId) {
      await databaseVar.database_connection();
      const validUser = await User.findOne({ _id: req.params.id })
      .then(
        (result) => {
          console.log("result in user table=", result);
          return result;
        }
      );
      if (validUser !== null) {
        console.log("creation starts");
        const createStudent = await Student.create({
          userId: req.params.id,
          ...req.body,
        });
        if (createStudent) {
          res.set("Content-Type", "application/json");
          res.status(StatusCodes.OK).json(createStudent);
          await databaseVar.database_disconnect();
        }
      } else {
        databaseVar.database_disconnect();
        throw new BadRequestError(
          `No user exist with the given id ${req.params.id} in the params.`
        );
      }
    } else {
      throw new BadRequestError(
        `Invalid ID : ${req.params.id} in the params. `
      );
    }
  } catch (err) {
    console.log("Error in creating student is - ", err.message);
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
  createStudent,
};
