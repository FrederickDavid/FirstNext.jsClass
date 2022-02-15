const imageModel = require("../../../utility/models/photoModel");
const bodyParser = require("body-parser");
const nc = require("next-connect");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "codelab2",
  api_key: "772558741566138",
  api_secret: "VbWBUuN8Bcl7luNdHleT2oatFxk",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const url = "mongodb://localhost/myUsers";

mongoose.connect(url).then(() => {
  console.log("Image DataBase is now connected and ready too Go...>");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

const handler = nc();
handler.use(upload);

handler.get(async (req, res) => {
  try {
    const getUsers = await imageModel.findById(req.query.id, req.body);
    res.status(200).json({
      message: "Users Found Successfully",
      totalUser: getUsers.length,
      data: getUsers,
    });
  } catch (error) {
    res.status(400).json({ message: "An error was found", data: err.message });
  }
});

handler.patch(async (req, res) => {
  try {
    const { userName, course } = req.body;
    console.log(req.file.path);

    const imageUploaded = await cloudinary.uploader.upload(req.file.path);
    console.log(imageUploaded);

    const getUsers = await imageModel.findByIdAndUpdate(
      {
        course,
        image: imageUploaded.secure_url,
        imageID: imageUploaded.public_id,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "User Updated Successfully", data: getUsers });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error was found", data: error.message });
  }
});
handler.delete(async (req, res) => {
  try {
    const deleteUser = await imageModel.findByIdAndRemove(req.query.id);
    res
      .status(200)
      .json({ message: "User Deleted Successfully", data: deleteUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error was found", data: error.message });
  }
});

export default handler;
