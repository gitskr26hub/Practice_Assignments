const mongoose = require("mongoose");

const PostDataSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  postedAt: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  signatureId: { type: String, required: true },
});

const AlldataModel = new mongoose.model("alldatas", PostDataSchema);

module.exports = AlldataModel;
