const mongoose = require("mongoose");

const imageModel = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    course: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.userImage || mongoose.model("userImage", imageModel);
