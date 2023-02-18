const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 30,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log("Error in encrypting password in model is= ", err.message);
    throw err;
  }
});

//creating jwt in mongoose
userSchema.methods.createJWT = async () => {
  try {
    return jwt.sign(
      { userID: this._id, name: this.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  } catch (err) {
    console.log("Error in creating JWT in user model is= ", err.message);
    throw err;
  }
};
//COMparing passwords method in mongoose
userSchema.methods.comparePassword = async (enteredPassword) => {
  try {
    const isMatch = bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (err) {
    console.log("Error in comparing password in user model is= ", err.message);
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);


class User {
  constructor(name,email,password,username){
  this.name = name;
  this.email = email;
  this.password = password;
  this.username = username;
  }

  saveData(){
    console.log("inserting")
  }

  comparePassword(enteredPassword){
  try {
    const isMatch = bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (err) {
    console.log("Error in comparing password in user model is= ", err.message);
    throw err;
  }
};

}

module.exports = User;
