const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.mongoURL + "application", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`MongoDB Connected`);
      })
      .catch((err) => console.log("failed to connect to DB"));
  } catch (error) {
    console.error(`ERROR CONNECT TO db`, error.message);
  }
};

module.exports = connectDB;
