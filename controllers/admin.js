// const mongodb = require("mongodb");
const mongoose = require("mongoose");
const Course = require("../models/courses");

//creating a course
const createCourse = async (req, res, next) => {
  try {
    const course = new Course({
      department: "Medicals",
      name: "MBBS",
      semNumber: 10,
    });
    course.save().then((result) => {
      console.log("successfully created ", result);
      res.redirect("/");
    });
  } catch (err) {
    console.log("error in admin.js in controller call is=", err.message);
  }
};

///for fetching all the courses
const fetchAll = async (req, res) => {
  try {
    const allCourses = await Course.fetchAll();
    console.log("all courses are as follows:", allCourses);
    res.redirect("/");
  } catch (err) {
    console.log("error in getall is", err.message);
  }
};

///for fetching single course
const fetchSingle = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log("params id = ", courseId);
    Course.fetchSingle(courseId).then((singleCourse) => {
      console.log("fetched single course = ", singleCourse);
    });
    // res.redirect('/');
  } catch (err) {
    console.log("error in fetch single is=", err.message);
  }
};

const updateSingle = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log(" update params id = ", courseId);
    const course1 = new Course("Bachelors", "engineering", 8, courseId);
    course1.saveData().then((updated) => {
      console.log("updated single= ", updated);
      res.redirect("/");
    });
  } catch (err) {
    console.log("error in updation single is=", err.message);
  }
};

const deleteSingle = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log(" delete params id = ", courseId);
    Course.deleteSingle(courseId).then((result) => {
      console.log("deleted reult", result);
    });
    res.redirect("/");
  } catch (err) {
    console.log("erorr in deleting course is = ", err.message);
  }
};

module.exports = {
  createCourse,
  fetchAll,
  fetchSingle,
  updateSingle,
  deleteSingle,
};

// const createCourse = async (req, res, next) => {
//   try {
//     const course = new Course({
//       department: "Medicals",
//       name: "MBBS",
//       semNumber: 10,
//     });
//     course.saveData().then((result) => {
//       console.log("successfully created ", result);
//       res.redirect("/");
//     });
//   } catch (err) {
//     console.log("error in admin.js in controller call is=", err.message);
//   }
// };
