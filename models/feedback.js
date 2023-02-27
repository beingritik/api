const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    feedback: {
      type: String,
      maxlength: 150,
      trim: true,
      required:true
  },
  },
  { timestamps: true }
);

feedbackSchema.pre("save", async function (next) {
  this.feedback =
    this.feedback.charAt(0).toUpperCase() + this.feedback.slice(1).toLowerCase();
  next();
});

// feedbackSchema.pre("findOneAndUpdate", async function (next) {
//   // console.log(this._update.status);
//   if (!this._update.status) return next();
//   if (this._update.status) {
//     this._update.status =
//       this._update.status.charAt(0).toUpperCase() +
//       this._update.status.slice(1).toLowerCase();
//   }

//   if (this._update.address) {
//     this._update.address =
//       this._update.address.charAt(0).toUpperCase() +
//       this._update.address.slice(1).toLowerCase();
//   }
// });

module.exports = mongoose.model("Feedback", feedbackSchema);
