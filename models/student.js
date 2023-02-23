const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    aadharNumber: {
      type: Number,
      required: [true, "Please provide aadhar number"],
    //   minlength: 12,
      maxlength: 12,
    },
    // dob: {
    //   type: Date,
    //   required: [true, "Please provide D.O.B"],
    // },
    // bloodGroup: {
    //   type: String,
    // },
    // address: {
    //   type: String,
    //   maxlength: 100,
    //   trim: true,
    // },
    // dept: {
    //   type: String,
    //   required: [true, "Department name is required"],
    //   unique: true,
    // },
    // status: {
    //   type: String,
    //   enum: ["enrolled", "passout"],
    //   default: "enrolled",
    //   required: [true, "Status is required"],
    // },
    // rollNo: {
    //   type: Number,
    //   required: [true, "Roll Number is required"],
    // },
    // adyear: {
    //   type: Number,
    //   required: [true, "Admission year is required"],
    // },
    // phone: {
    //   type: Number,
    //   minlength: 10,
    //   maxlength: 12,
    // },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Student", studentSchema);
