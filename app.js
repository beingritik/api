require("dotenv").config();
const express = require("express");
const app = express();
const adminRouter = require('./routes/adminRouter')

app.get(express.json());

//Required dependencies 
const dbConnection = require("./db/connect");

// Routes for user
app.use('/user',adminRouter);

//common route for dashboard
app.get("/", async (req, res) => {
  res.send("Dashboard");
});

//Calling the port 
const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log(`Server is listening on ${port}`);
});

//function for creating the database connection
const start_function =async()=>{
  try {
    await dbConnection.connectDb(process.env.MONGO_URI)
    .then((result) => {
      console.log("Connected to Mongodb with =", result.connections[0]._connectionString);
    });
  } catch (err) {
    console.log("error in calling start_function in app.js", err);
    throw new err;
  }
};

start_function();


 