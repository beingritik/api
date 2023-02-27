const Feedback = require("../models/feedback");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, customApiError } = require("../errors");
const mongoose = require("mongoose");
const databaseVar = require("../db/database");

//get all feedbacks
const getAllFeedback = async function (req, res) {
  try {
    const message = "No users to fetch. Please create users to be displayed.";
    await databaseVar.database_connection();
    const feedbacks = await Feedback.find({}).sort("createdAt");
    console.log("users are", feedbacks.length);
    let count = feedbacks.length;
    if (count > 0) {
      res
        .status(StatusCodes.OK)
        .json({ feedbacks, feedbacksCount: { totalFeedbacks: count } });
    } else {
      res
        .status(StatusCodes.OK)
        .json({ message: message, feedbacksCount: { totalFeedbacks: count } });
    }
    databaseVar.database_disconnect();
  } catch (err) {
    console.log("err in the get all feedback is=", err.message);
    throw err;
  }
};

//create feedback 
const createFeedback = async function (req, res) {
  try {
    console.log("creation of feedback entered with ");
    const{
      params:{id:userId}
    }=req;
  
 const validuserId = mongoose.Types.ObjectId.isValid(userId);
    if (validuserId) {
      await databaseVar.database_connection();
      const validUser = await User.findOne({ _id: userId }).then(
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
          `No user exist with the given id ${userId} in the params.`
        );
      }
    } else {
      throw new BadRequestError(
        `Invalid ID : ${req.params.id} in the params. `
      );
    }
    databaseVar.database_disconnect();
  } catch (err) {
    console.log("Error in creating student is - ", err.message);
    throw err;
  }
};

module.exports = {
  getAllFeedback,
  createFeedback
};
