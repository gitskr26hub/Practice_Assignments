const AllDataModel = require("../Models/Data.Model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//to post data
const Create_Data = async (req, res) => {
  const { name, description, category, image, location, postedAt, price } =
    req.body;

  const user = req.user;
  // console.log("user", user);
  try {
    if ((name, description, category, image, location, postedAt, price)) {
      const data = new AllDataModel({ ...req.body, signatureId: user._id });
      await data.save();
      res.status(200).json({ msg: "created successfully" });
    } else {
      res.status(400).json({ msg: "failed to create" });
    }
  } catch (err) {
    res.status(400).json({ msg: "failed to create" });
    console.log(err);
  }
};

// to get data
// offset: quantity of items to skip
// limit: quantity of items to fetch
// limit = size
// offset = page * size
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// const getPagingData = (data, page, limit) => {
//   const { count: totalItems, rows: tutorials } = data;
//   const currentPage = page ? +page : 0;
//   const totalPages = Math.ceil(totalItems / limit);

//   return { totalItems, tutorials, totalPages, currentPage };
// };

const Fetch_Data = async (req, res) => {
  const { page, size, category, byProduct } = req.query;
  const { limit, offset } = getPagination(page, size);

  // console.log(page,size,limit,offset,category,byProduct)

  var condition =
    category
      ? { category: category }
      : null;

  //  console.log(condition)
  try {
    if (byProduct) condition = byProduct ? { name: byProduct } : null;

    const Data = await AllDataModel.find(condition).limit(limit).skip(offset);
    const Count = await AllDataModel.find(condition);
    //  const { totalItems, tutorials, totalPages, currentPage }=getPagingData(data,page,limit)

    // if (byProduct)
    //   setTimeout(() => {
    //     res.status(200).json({ msg: "success", data });
    //   }, 1000);
    // else
    res
      .status(200)
      .json({ msg: "success", data: { rows: Data, count: Count.length } });
  } catch (err) {
    console.log(err);
  }
};

const Fetch_Data_onlyByUser = async (req, res) => {
  const user = req.user;
  try {
    const Data = await AllDataModel.find({ signatureId: user._id });
    // console.log(data);
    res.status(200).json({ msg: "success", data: { rows: Data } });
  } catch (err) {
    console.log(err);
  }
};

const Delete_byUser = async (req, res) => {
  const user = req.user;
  const { id } = req.body;
  console.log(user, id);
  try {
    await AllDataModel.deleteOne({
      $and: [{ signatureId: user._id }, { _id: id }],
    });
    res.status(200).json({ msg: "successfully deleted" });
  } catch (err) {
    console.log(err);
  }
};

////////////////////EXPORT ALL ///////////////////
module.exports = {
  Create_Data,
  Fetch_Data,
  Fetch_Data_onlyByUser,
  Delete_byUser,
};
