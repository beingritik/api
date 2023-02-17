require("dotenv").config();
const express = require("express");
const app = express();
app.get(express.json());
// const controllerVar = require("./controllers/admin");
const dbConnection = require("./db/connect");
const adminRouterVar = require("./routes/adminRouter");

app.get("/", async (req, res) => {
  res.send("Dashboard");
});

app.use("/student", adminRouterVar.router);

const port = process.env.PORT || 3001;

app.listen(port,()=>{
  console.log(`Server is listening on ${port}`);
})

const start_function =async()=>{
  try {
    await dbConnection.connectDb(process.env.MONGO_URI)
    .then((result) => {
      console.log("connected to Mongodb=", result);
    });
  } catch (err) {
    console.log("error in calling start_function in app.js", err);
  }
};

start_function();
   
// const port = process.env.PORT || 3001;
// const start_function= async function(){
//     try{
//       dbConnection.mongoConnect(()=>{
//        app.listen(port, () => {
//          console.log(`Server is listening on port ${port}...`);
//        });
//       })
//     }
//     catch(err){
//       console.log("error in calling start_function in app.js",err);
//     }
