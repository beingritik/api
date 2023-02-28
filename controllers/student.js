const Student = require("../models/student");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, customApiError } = require("../errors");
const mongoose = require("mongoose");
const databaseVar = require("../db/database");

//get single Student by Id
const getStudent = async function (req, res) {
  // console.log("getStudent called", req.params.id);
  const {
    params: { id: userId },
  } = req;

  const validStudent = mongoose.Types.ObjectId.isValid(userId);
  if (validStudent) {
    await databaseVar.database_connection();
    const student = await Student.findOne({ _id: userId })
      .populate("userId", ["-createdAt", "-updatedAt", "-__v"])
      .then((result) => {
        return result;
      });
    // console.log("Deleted User--", deletedStudent);
    if (student === null) {
      throw new BadRequestError(
        `Please verify your details in admin section. No student with this user Id : ${userId} , yet created.`
      );
    } else res.status(StatusCodes.OK).json({ student });
  } else {
    throw new BadRequestError(`Invalid ID passed in the params: ${userId}`);
  }
  databaseVar.database_disconnect();
};

// Update single student info by student (three fields only )
const updateInfo = async function (req, res) {
  console.log("update Info called ");
  const {
    params: { id: studentId },
    body: { address, bloodgroup, phone },
  } = req;
  let message = "Successfully Updated";

  if (mongoose.Types.ObjectId.isValid(studentId)) {

    await databaseVar.database_connection();
    const studentIsVerified = await Student.findOne({ _id: studentId }).then(
      (result) => {
        console.log("User is ", result.status);
        return result;
      }
    ).catch((err)=>{
      return null;
    })
    if (studentIsVerified) {
      if (studentIsVerified.status == "Verified") {
        const userIsActive = await Student.findOne({ _id: studentId })
          .populate("userId")
          .then((result) => {
            // console.log("User is= ", result.userId.status);
            return result;
          });
        // console.log("Isactive=", userIsActive.userId.status);
        if (userIsActive.userId.status == "active") {
          const updatedInfo = await Student.findByIdAndUpdate(
            { _id: studentId },
            { address: address, phone: phone, bloodgroup: bloodgroup },
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
        } else {
          throw new BadRequestError("User is not active.");
        }
      } else {
        throw new BadRequestError(
          "Student details not verified . Unable to update."
        );
      }
    } else {
      throw new BadRequestError(
        `No student exist with studentId in the params: ${studentId}`
      );
    }
    databaseVar.database_disconnect();
  } else {
    throw new BadRequestError(`Invalid studentId in the params:${studentId}`);
  }
};

module.exports = {
  getStudent,
  updateInfo,
};
