require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const adminLoginRouter = require("./routes/adminloginrouter");
const adminRouter = require("./routes/adminRouter");
const studentRouter = require("./routes/studentRouter");
const notFoundMiddleware = require('./middleware/notFound');
const {errorHandlerMiddleware} = require("./middleware/errorhandler");

//Required dependencies 
app.use(express.json());

// Middlewares for user
app.use('/admin',adminRouter);
app.use("/", adminLoginRouter);
app.use("/student", studentRouter);
//common route for dashboard
// app.get("/", async (req, res) => {
//   res.send("Dashboard");
// });

//Midlewares for errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


//Calling the port 
const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log(`Server is listening on ${port}`);
});



 