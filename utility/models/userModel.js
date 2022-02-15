const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    course: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.users || mongoose.model("users", userModel);
