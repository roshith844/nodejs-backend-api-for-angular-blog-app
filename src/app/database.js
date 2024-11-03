require("dotenv").config({ path: __dirname + "./../../.env" });

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log(err);
  });
