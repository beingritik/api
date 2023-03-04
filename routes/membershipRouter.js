const express = require("express");
const membershipRouter = express.Router();

//Required controllers for student
const membershipController = require("../controllers/membership");

membershipRouter
  .post("/createmembership/:id", membershipController.createMembership)

module.exports = membershipRouter;
