const User = require("../models/user");
const dbConnection = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, customApiError } = require("../errors");
const mongoose = require("mongoose");

//For establishing the connection.
const start_function = async () => {
  await dbConnection.connectDb(process.env.MONGO_URI).then((result) => {
    console.log(
      "Connected to Mongodb with =",
      result.connections[0]._connectionString
    );
  });
};

//login of User
const userLogin = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email and password shouldnt be empty.");
    }
    await start_function();
    const user = await User.findOne({ email });
    if (!user) {
      // throw new BadRequestError("Please provide email ");
      throw new BadRequestError("incorrect email ");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    // console.log("ispassword=", isPasswordCorrect);
    if (!isPasswordCorrect) {
      // throw new UnauthenticatedError("Invalid Credentials");
      throw new BadRequestError("Invalid password");
    }
    await user.createJWT().then((token) => {
      console.log("token is in =", token);
      res.status(StatusCodes.OK).json({
        loggedInUser: {
          name: user.name,
          username: user.username,
          userEmail: user.email,
        },
        token,
      });
    });
    mongoose.connection.close(function () {
      console.log(
        "MongoDb connection closed with readystate =",
        mongoose.connection.readyState
      );
    });
  } catch (err) {
    console.log("error in adminLogin function is=", err.message);
    throw err;
  }
};

///login of Admin  (neeche maine define kiya hai)
const adminLogin = async function (req, res) {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      throw new BadRequestError("Email and password shouldnt be empty.");
    }
    if (name === "admin" && password === process.env.HASHED) {
      const user = new User();
      user.createJWT().then((token) => {
        res.status(StatusCodes.OK).json({
          loggedInadmin: {
            adminName: "admin",
          },
          token,
        });
      });
    } else {
      throw new BadRequestError("Invalid admin credentials.");
    }
  } catch (err) {
    console.log("error in adminLogin function is=", err.message);
    throw err;
  }
};

module.exports = {
  adminLogin,
  userLogin,
};

///login of Admin
// const adminLogin = async function (req, res) {
//   try {
//     // await start_function();
//     const { name, password } = req.body;
//     if (!name || !password) {
//       throw new BadRequestError("Email and password shouldnt be empty.");
//     }
//     if (name === "admin" && password === process.env.HASHED) {
//       const user = new User();
//       user.createJWT().then((token) => {
//         // console.log("token is in =", token);
//         res.status(StatusCodes.OK).json({
//           loggedInadmin: {
//             adminName: "admin",
//           },
//           token,
//         });
//       });
//     } else {
//       throw new BadRequestError("Invalid admin credentials.");
//     }
//     // const user = await User.findOne({ email });
//     // if (!user) {
//     //   // throw new BadRequestError("Please provide email ");
//     //   throw new BadRequestError("incorrect email ");
//     // }
//     // const isPasswordCorrect = await user.comparePassword(password);
//     // // console.log("ispassword=", isPasswordCorrect);
//     // if (!isPasswordCorrect) {
//     //   // throw new UnauthenticatedError("Invalid Credentials");
//     //   throw new BadRequestError("Invalid password");
//     // }

//     // mongoose.connection.close(function () {
//     //   console.log(
//     //     "MongoDb connection closed with readystate =",
//     //     mongoose.connection.readyState
//     //   );
//     // });
//   } catch (err) {
//     console.log("error in adminLogin function is=", err.message);
//     throw err;
//   }
// };
