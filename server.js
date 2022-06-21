const express = require('express');
const app = express();
const mclient = require("mongodb").MongoClient;
const path = require("path");
app.use(express.static(path.join(__dirname, "./build")));
const DbUrl =
  "mongodb+srv://poorna_1307:chandu13@poorna.zv57ipv.mongodb.net/?retryWrites=true&w=majority";

// connect db to server
mclient
  .connect(DbUrl)
  .then((client) => {
    let dbObj = client.db("UWBDb");
    let bornLearningsCollection = dbObj.collection("bornLearnings");
    app.set('bornLearningsCollection', bornLearningsCollection);
    console.log("database connected");
  })
  .catch((err) => console.log("db connection error", err));
// const AdminApi = require("./APIS/admin");
// app.use("/admin", AdminApi);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.use((req, res, next) => {
  res.send({ message: `path not found ${req.path}` });
});
// handle errors
app.use((error, req, res, next) => {
  console.log(error.message);
  res.send({ message: `error ${error.message} has occured` });
});

app.listen(4001, () => {
  console.log("listening on 4000");
});
