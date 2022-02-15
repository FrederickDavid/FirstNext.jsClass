const userModel = require("../../../utility/models/userModel");
const mongoose = require("mongoose");

const url = "mongodb://localhost/myUsers";

mongoose.connect(url).then(() => {
  console.log("DataBase is now connected and ready too Go...>");
});

const handler = async (req, res) => {
  try {
    const { method } = req;
    if (method === "GET") {
      const getUsers = await userModel.findById(req.query.id, req.body);
      res.status(200).json({ message: "Single User Found", data: getUsers });
    }
    if (method === "PATCH") {
      const getUsers = await userModel.findByIdAndUpdate(
        req.query.id,
        { course: req.body.course },
        { new: true }
      );
      res.status(200).json({ message: "Updated Successfully", data: getUsers });
    }
    if (method === "DELETE") {
      const getUsers = await userModel.findByIdAndRemove(
        req.query.id,
        req.body
      );
      res.status(200).json({ message: "Deleted Successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "An error was found", data: err.message });
  }
};

export default handler;
