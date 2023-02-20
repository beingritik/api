const User = require("../models/user");

const login = async function (req, res) {
  console.log("login user entered;");
};

const registerUser = async function (req, res) {
  console.log("registered user entered with =",req.body);
//   const user = new User(re)
  res.send("registered");
};

module.exports = {
  registerUser,
  login,
};
