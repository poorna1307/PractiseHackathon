const exp = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const adminAPI = exp.Router();
adminAPI.use(exp.json());

adminAPI.post(
  "/login",
  asyncHandler(async (request, response) => {
    const AdminCollectionObj = request.app.get("AdminCollection");
    userObj = request.body;
    let tempUser = await AdminCollectionObj.findOne({
      username: userObj.username,
    });

    if (tempUser === null) {
      response.send({ message: "Invalid users" });
    } else {
      let status = await bcrypt.compare(userObj.password, tempUser.password);
      if (userObj.password === tempUser.password || status == true) {
        response.send({ message: "Login success", userdata: tempUser });
        // console.log("user found");
      } else {
        response.send({ message: "Invalid password" });
      }
    }
  })
);

adminAPI.post(
  "/create-user",
  asyncHandler(async (request, response) => {
    const AdminCollectionObj = request.app.get("AdminCollection");
    let newUser = request.body;
    let tempUser = await AdminCollectionObj.findOne({
      username: newUser.username,
    });
    if (tempUser !== null) {
      response.send({
        message: "The username already exist..please choose another..",
      });
    } else {
      let hashedPassword = await bcrypt.hash(newUser.password, 5);
      newUser.password = hashedPassword;
      // newUser.photo=request.file.path;
      await AdminCollectionObj.insertOne(newUser);
      response.send({ message: "User Created successfully..." });
    }
  })
);

module.exports = adminAPI;
