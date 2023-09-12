const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

//conncet to Database
connectDB();

//default middleware

app.use(express.json());
app.use(cors({ origin: "*" }));

//  require all routes
const AuthrRouter = require("./routes/Auth.Route");
const AlldataRouter = require("./routes/Data.Route")



app.use("/auth", AuthrRouter);
app.use("/data", AlldataRouter);



app.listen(process.env.PORT, async () => {
  try {
    console.log(`Our server is running on port ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});

// console.log(connection);
