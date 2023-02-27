const express = require("express");
const adminRouter = express.Router();

//Required controllers for admin
const adminControllerVar= require("../controllers/admin");

adminRouter
  .post("/createuser", adminControllerVar.createUser)
  .post("/createstudent/:id", adminControllerVar.createStudent)
  .get("/deleteuser/:id", adminControllerVar.deleteUser)
  .get("/deletestudent/:id", adminControllerVar.deleteStudent)
  .get("/getallusers", adminControllerVar.getAllUsers)
  .get("/getallstudents", adminControllerVar.getAllStudents)
  .post("/updateuser/:id", adminControllerVar.updateUser)
  .post("/updatestudent/:id", adminControllerVar.updateStudent)

module.exports =  adminRouter;