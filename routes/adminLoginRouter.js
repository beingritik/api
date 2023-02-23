const express = require("express");
const adminLoginRouter = express.Router();

//Required controllers for user
const authControllerVar = require("../controllers/auth");

adminLoginRouter
.post("/adminlogin", authControllerVar.adminLogin)
.post("/userlogin", authControllerVar.userLogin)

module.exports = adminLoginRouter;
