const express = require("express");
const router = express.Router();

const controllerVar= require("../controllers/admin");

router.post("/register", controllerVar.registerUser);

module.exports = {
  router
};
