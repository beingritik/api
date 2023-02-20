require("dotenv").config();
const express = require("express");
const app = express();
const adminRouter = require('./routes/adminRouter')

app.use(express.json());

//Required dependencies 

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


 