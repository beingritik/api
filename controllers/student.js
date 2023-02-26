const Student = require("../models/student");
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

//get single Student by Id
const getStudent = async function (req, res) {
  console.log("getStudent called", req.params.id);
  const {
    params: { id: studentId },
  } = req;
  const validStudent = mongoose.Types.ObjectId.isValid(studentId);
  if (validStudent) {
    await start_function();
    const student = await User.findOne({ _id: studentId })
    .then((result) => {
      return result;
    });
    // console.log("Deleted User--", deletedStudent);
    if (student === null) {
      throw new BadRequestError(`No student with this studentId: ${studentId}`);
    } else res.status(StatusCodes.OK).json({ student });
  } else {
    throw new BadRequestError(`Invalid ID passed in the params: ${studentId}`);
  }
  mongoose.connection.close(function () {
    console.log(
      "MongoDb connection closed with readystate =",
      mongoose.connection.readyState
    );
  });
};

//update single Student by Id (some information )
const updateInfo = async function (req, res) {
    console.log("getStudent called", req.params.id);
    const {
      params: { id: studentId },
    } = req;
    const validStudent = mongoose.Types.ObjectId.isValid(studentId);
    if (validStudent) {
      await start_function();
      const student = await User.findOne({ _id: studentId })
      .then((result) => {
        return result;
      });
      // console.log("Deleted User--", deletedStudent);
      if (student === null) {
        throw new BadRequestError(`No student with this studentId: ${studentId}`);
      } else res.status(StatusCodes.OK).json({ student });
    } else {
      throw new BadRequestError(`Invalid ID passed in the params: ${studentId}`);
    }
    mongoose.connection.close(function () {
      console.log(
        "MongoDb connection closed with readystate =",
        mongoose.connection.readyState
      );
    });
  };

module.exports = {

  getStudent,
  updateInfo
 
};
