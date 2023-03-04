const mongoose =require('mongoose');

const membershipSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
