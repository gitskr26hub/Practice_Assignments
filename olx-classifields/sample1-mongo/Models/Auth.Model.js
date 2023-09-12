const mongoose = require("mongoose");

const ResgisterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
});

const userDetailsModel =new mongoose.model("usersDatas", ResgisterSchema);

module.exports = userDetailsModel;
