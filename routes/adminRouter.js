const express = require("express");
const adminRouter = express.Router();

//Required controllers for user
const userControllerVar= require("../controllers/user");

adminRouter
  .post("/createuser", userControllerVar.createUser)
  .get("/getall", userControllerVar.getAllUsers)
  .post("/create/:id", userControllerVar.createStudent);


module.exports =  adminRouter;