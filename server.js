require("dotenv").config();
const express = require("express");
const app = express();
const mclient = require("mongodb").MongoClient;
const path = require("path");
app.use(express.static(path.join(__dirname, "./build")));
const DbUrl = process.env.DB_URL;

// connect db to server
mclient
  .connect(DbUrl)
  .then((client) => {
    let dbObj = client.db("UWBDb");
    let AdminCollection = dbObj.collection("Admin");
    app.set("AdminCollection", AdminCollection);
    console.log("database connected");
  })
  .catch((err) => console.log("db connection error", err));

const AdminApi = require("./APIS/adminAPI");
app.use("/admin", AdminApi);

// to build
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
// invalid paths
app.use((req, res, next) => {
  res.send({ message: `path not found ${req.path}` });
});
// handle errors
app.use((error, req, res, next) => {
  console.log(error.message);
  res.send({ message: `error ${error.message} has occured` });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening on", port);
});
