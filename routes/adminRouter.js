const express = require("express");
const adminRouter = express.Router();

//Required controllers for user
const userControllerVar= require("../controllers/user");

adminRouter
.post("/register", userControllerVar.registerUser)

module.exports =  adminRouter;