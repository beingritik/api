// //using the connection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  department: {
    type: String,
    required: [true, "provide department name"],
  },
  name: {
    type: String,
    required: [true, "provide degree name"],
  },
  semNumber: {
    type: Number,
    required: [true, "provide semNumber"],
  },
  courseId: {
    type: String,
    // required: [true, "provide title"],
  },
});


module.exports = mongoose.model("Course", courseSchema);



// const mongodb = require("mongodb");
// const dbconnec = require("../db/connect");

// //define class course
// class Course {
//   constructor(department, name, semNumber, id) {
//     this.department = department;
//     this.name = name;
//     this.semNumber = semNumber;
//     this.updationId = id ? new mongodb.ObjectId(id):null;
//   }
//   saveData() {
//     const db = dbconnec.getdb();
//     let dbOperation;
//     return new Promise((resolve) => {
//       if (this.updationId) {
//         console.log("update works");
//         dbOperation = db
//           .collection("courses")
//           .updateOne({ _id: this.updationId }, { $set: this })
//           .then((result) => {
//             resolve(result);
//           });
//       } else {
//         dbOperation = db
//           .collection("courses")
//           .insertOne(this)
//           .then((result) => {
//             resolve(result);
//           })
//           .catch((err) => {
//             console.log("error in creating courses are:", err.message);
//           });
//       }
//       return dbOperation;
//     });
//   }

//   static fetchAll() {
//     const db = dbconnec.getdb();
//     return db.collection("courses").find().toArray();
//   }
//   static fetchSingle(courseId) {
//     const db = dbconnec.getdb();
//     return db
//       .collection("courses")
//       .find({ _id: new mongodb.ObjectId(courseId) })
//       .toArray();
//   }
//   static deleteSingle(courseId) {
//     const db = dbconnec.getdb();
//     return db.collection("courses").deleteOne({
//       _id: new mongodb.ObjectId(courseId),
//     });
//   }
// }

// module.exports = Course;
