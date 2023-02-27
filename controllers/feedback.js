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
    await databaseVar.database_connection();

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
