const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 30,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password field shouldnt be empty."],
      minlength: 6,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// //creating jwt in mongoose
userSchema.methods.createJWT = async () => {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

//Comparing passwords method in mongoose
userSchema.methods.comparePassword = async function(enteredPassword){
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};


// };

// class User {
//   constructor(name,email,password,username){
//   this.name = name;
//   this.email = email;
//   this.password = password;
//   this.username = username;
//   }
//   saveData(){
//     console.log("inserting");

//   }
// }

module.exports = mongoose.model("User", userSchema);
// module.exports = User;
