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
  const getUsers = await imageModel.find({});
  res.status(200).json({
    message: "Users Found Successfully",
    totalUser: getUsers.length,
    data: getUsers,
  });
});

handler.post(async (req, res) => {
  const { userName, course } = req.body;

  const imageUploaded = await cloudinary.uploader.upload(req.file.path);
  console.log(imageUploaded);

  const getUsers = await imageModel.create({
    userName,
    course,
    image: imageUploaded.secure_url,
    imageID: imageUploaded.public_id,
  });
  res
    .status(200)
    .json({ message: "User Created Successfully", data: getUsers });
});

export default handler;
