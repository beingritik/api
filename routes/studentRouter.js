const express = require("express");
const studentRouter = express.Router();

//Required controllers for student
const studentControllerVar= require("../controllers/student");

studentRouter
   //for ID card 
   .get("/getstudent/:id", studentControllerVar.getStudent)
   .post("/updateinfo/:id", studentControllerVar.updateInfo)

module.exports =  studentRouter;