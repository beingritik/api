require("dotenv").config();
const express = require("express");
const app = express();
const adminRouter = require('./routes/adminRouter')
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require("./middleware/errorhandler");

//Required dependencies 
app.use(express.json());

// Middlewares for user
app.use('/user',adminRouter);

//common route for dashboard
app.get("/", async (req, res) => {
  res.send("Dashboard");
});

//Midlewares for errors
app.use(notFoundMiddleware);
app.use(errorhandlerMiddleware);


//Calling the port 
const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log(`Server is listening on ${port}`);
});



 