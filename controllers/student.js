const Student = require("../models/student");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, customApiError } = require("../errors");
const mongoose = require("mongoose");
const databaseVar = require("../db/database");


//get single Student by Id
const getStudent = async function (req, res) {
  // console.log("getStudent called", req.params.id);
  const {
    params: { id: studentId },
  } = req;

  const validStudent = mongoose.Types.ObjectId.isValid(studentId);
  if (validStudent) {
    await databaseVar.database_connection();
    const student = await Student.findOne({ _id: studentId })
      .populate("userId", ["-createdAt", "-updatedAt", "-__v"])
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
        databaseVar.database_disconnect();

};

// Update single student info by student (three fields only )
  const updateInfo = async function (req, res) {
    // console.log("update Info called ");
    const {
      params: { id: studentId },
      body: { address, bloodgroup ,phone},
    } = req;
    let message = "Successfully Updated";
    if (mongoose.Types.ObjectId.isValid(studentId)) {
      await databaseVar.database_connection();
      const updatedInfo = await Student.findByIdAndUpdate(
        { _id: studentId },
        {address:address,phone:phone,bloodgroup:bloodgroup},
        { new: true, runValidators: true }
      ).then((result) => {
        // console.log("result in updation =",result);
        return result;
      });
      if (updatedInfo === null) {
        throw new BadRequestError(
          `No Student with this id in the params :${studentId}`
        );
      } else {
        res
          .status(StatusCodes.OK)
          .json({ updatedInfo, message: { message } });
      }
      databaseVar.database_disconnect();
    } else {
      throw new BadRequestError(`Invalid studentId in the params:${studentId}`);
    }
  };

module.exports = {
  getStudent,
  updateInfo
};
