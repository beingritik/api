const express = require("express");
const adminRouter = express.Router();

//Required controllers for user
const userControllerVar= require("../controllers/user");

adminRouter
  .post("/createUser", userControllerVar.createUser)
  .get("/getall", userControllerVar.getAllUsers)


module.exports =  adminRouter;