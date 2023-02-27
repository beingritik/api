const User = require("../models/user");
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

//Create new user
const createUser = async function (req, res) {
  try {
    console.log("registered user entered with");
    await start_function();
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

//create new student
const createStudent = async function (req, res) {
  try {
    console.log("registered student entered with = ", req.params.id);
    const {
      params: { id: userId },
    } = req;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      await start_function();
      const validuser = await Student.findOne({ userId: userId }).then(
        (result) => {
          return result;
        }
      );
      console.log("validity--", validuser);
      if (validuser === null) {
        const createStudent = await Student.create({
          userId: userId,
          ...req.body,
        });
        if (createStudent) {
          res.set("Content-Type", "application/json");
          res.status(StatusCodes.OK).json(createStudent);
        }
        mongoose.connection.close(function () {
          console.log(
            "MongoDb connection closed with readystate =",
            mongoose.connection.readyState
          );
        });
      }

      //closing the connection
    }
  } catch (err) {
    console.log("Error in creating student is - ", err.message);
    throw err;
  }
};

//get all Users
const getAllUsers = async function (req, res) {
  try {
    console.log("getall called");
    const message = "No users to fetch. Please create users to be displayed.";
    await start_function();
    const users = await User.find({}).sort("createdAt");
    console.log("users are", users.length);
    let count = users.length;
    if (count > 0) {
      res
        .status(StatusCodes.OK)
        .json({ users, usersCount: { totalUsers: count } });
    } else {
      res
        .status(StatusCodes.OK)
        .json({ message: message, usersCount: { totalUsers: count } });
    }
    mongoose.connection.close(function () {
      console.log(
        "MongoDb connection closed with readystate =",
        mongoose.connection.readyState
      );
    });
  } catch (err) {
    console.log("Error in fetching users in  are:", err.message);
    throw err;
  }
};

// delete single user
const deleteUser = async function (req, res) {
  console.log("deleteUser called", req.params.id);
  const {
    params: { id: userId },
  } = req;
  const validUser = mongoose.Types.ObjectId.isValid(userId);
  if (validUser) {
    await start_function();
    const deletedUser = await User.findOneAndDelete({ _id: userId }).then(
      (result) => {
        return result;
      }
    );
    // console.log("Deleted User--", deletedUser);
    if (deletedUser === null) {
      throw new BadRequestError(`No job with this userId: ${userId}`);
    } else {
      let message =
        "Successfully deleted , no Student associated with it yet till deletion.";
      const deleteAssociatedStudent = await Student.findOneAndDelete({
        userId: userId,
      }).then((result) => {
        return result;
      });
      if (deleteAssociatedStudent === null) {
        res.status(StatusCodes.OK).json({ deletedUser, message: { message } });
      } else {
        let message =
          "Successfully deleted the user and the student associated with it.";
        res.status(StatusCodes.OK).json({ deletedUser, message: { message } });
      }
      mongoose.connection.close(function () {
        console.log(
          "MongoDb connection closed with readystate =",
          mongoose.connection.readyState
        );
      });
    }
  } else {
    throw new BadRequestError(`Invalid ID passed in the params ${userId}`);
  }
};

//get all students
const getAllStudents = async function (req, res) {
  try {
    console.log("getallstudents called");
    const message =
      "No Students to fetch. Please create Students to be displayed.";
    await start_function();
    const students = await Student.find({}).sort("createdAt");
    console.log("students are", students.length);
    let count = students.length;
    if (count > 0) {
      res
        .status(StatusCodes.OK)
        .json({ students, studentsCount: { totalStudents: count } });
    } else {
      res
        .status(StatusCodes.OK)
        .json({ message: message, studentsCount: { totalStudents: count } });
    }
    mongoose.connection.close(function () {
      console.log(
        "MongoDb connection closed with readystate =",
        mongoose.connection.readyState
      );
    });
  } catch (err) {
    console.log("Error in fetching students in  are:", err.message);
    throw err;
  }
};

//delete single student
const deleteStudent = async function (req, res) {
  console.log("deleteStudent called", req.params.id);
  const {
    params: { id: studentId },
  } = req;
  let message = "Successfully deleted";
  const validStudent = mongoose.Types.ObjectId.isValid(studentId);
  if (validStudent) {
    await start_function();
    const deletedStudent = await Student.findOneAndDelete({
      _id: studentId,
    }).then((result) => {
      return result;
    });
    console.log("Deleted User--", deletedStudent);
    if (deletedStudent === null) {
      throw new BadRequestError(`No student with this studentId: ${studentId}`);
    } else
      res.status(StatusCodes.OK).json({ deletedStudent, message: { message } });
  } else {
    throw new BadRequestError(`Invalid ID passed in the params ${studentId}`);
  }
  mongoose.connection.close(function () {
    console.log(
      "MongoDb connection closed with readystate =",
      mongoose.connection.readyState
    );
  });
};


//update single user
const updateUser = async function (req, res) {
  console.log("update user called ");
  let message = "Successfully Updated";
  const {
    params: { id: userId },
  } = req;

  if(mongoose.Types.ObjectId.isValid(userId)){
    await start_function();
    const updatedUser = await User.findByIdAndUpdate({_id:userId},
      req.body,
      { new: true, runValidators: true }
      )
    .then((result)=>{
      // console.log("result in updation =",result);
      return result;
    })
    if(updatedUser ===null){
      throw new BadRequestError(`No User with this id in the params :${userId}`)
    }else{
      res.status(StatusCodes.OK).json({ updatedUser, message: { message } });
    }

    mongoose.connection.close(function () {
      console.log(
        "MongoDb connection closed with readystate =",
        mongoose.connection.readyState
      );
    });
  }else{
    throw new BadRequestError(`Invalid userId in the params:${userId}`);
  }
};


//update single student
const updateStudent = async function (req, res) {
  console.log("update Student called ");
  const {
    params: { id: studentId },
  } = req;

};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
};
