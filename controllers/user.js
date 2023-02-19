const User = require("../models/user");

const login = async function (req, res) {
  console.log("login user entered;");
};

const registerUser = async(req, res)=> {
  console.log("registered user entered;",req.body);
  res.send("registered");

//  res.redirect("/");
};

module.exports = {
  registerUser,
  login,
};
