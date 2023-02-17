const express = require("express");
const router = express.Router();

const controllerVar= require("../controllers/admin");

router
  .get("/create", controllerVar.createCourse)
  .get("/courses", controllerVar.fetchAll)
  .get("/:id", controllerVar.fetchSingle)
  .get("/update/:id", controllerVar.updateSingle)
  .get("/delete/:id", controllerVar.deleteSingle)



module.exports = {
  router
};
