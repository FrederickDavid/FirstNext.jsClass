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
      const getUsers = await userModel.find({});
      res
        .status(200)
        .json({
          message: "User Found",
          totalUser: getUsers.length,
          data: getUsers,
        });
    }
    if (method === "POST") {
      const getUsers = await userModel.create(req.body);
      res.status(200).json({ message: "Created Successfully", data: getUsers });
    }
  } catch (err) {
    res.status(400).json({ message: "An error was found", data: err.message });
  }
};

export default handler;
