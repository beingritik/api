const express = require("express");
const adminLoginRouter = express.Router();

//Required controllers for user
const userControllerVar = require("../controllers/user");

adminLoginRouter
.post("/adminlogin", userControllerVar.adminLogin);

module.exports = adminLoginRouter;
