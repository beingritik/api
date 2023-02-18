const user = require('../models/user');

const login = async function (req, res) {
  console.log("login user entered;");
};

const registerUser = async function (req, res) {
  res.send("registered");
  console.log("registered user entered;");
  res.redirect("/");
};

module.exports = {
  registerUser,
  login,
};
