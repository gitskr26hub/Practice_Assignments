const userDetailsModel = require("../Models/Auth.Model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// for login backend only
const login = async (req, res) => {
  const { auth, password } = req.body;

  try {
    const user = await userDetailsModel.findOne({
      $or: [{ email: `${auth}` }, { username: `${auth}` }],
    });

    if (user._id) {
      // console.log(user)
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err);
          throw new Error(err);
        }

        if (result) {
          // console.log(user)
          const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.SECRET_KEY
          );
          //  console.log('token',token);
          res.status(200).json({ msg: "login successful", token: token });
        } else {
          res.status(200).json({ msg: "Invalid Password" });
        }
      });
    } else {
      res.status(200).json({ msg: "Invalid username or email" });
    }
    console.log(user);
  } catch (err) {
    // if(!err){err="site id is invalid" }
    console.log(err);
    res.status(401).json({ API_Status: "false", API_Message: err });
  }
};

////////////////////register//////////////////////////////////////
const Register = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);

  try {
    const isUserExist = await userDetailsModel.findOne({
      $or: [{ email: `${email}` }, { username: `${username}` }],
    });
    console.log("is exist", isUserExist);

    if (isUserExist === null) {
      const salt = bcrypt.genSaltSync(15);
      bcrypt.hash(password, salt, async function (err, hashpassword) {
        // Store hash in your password DB.
        if (err) console.log(err);
        else {
          const data = new userDetailsModel({
            email: email,
            username: username,
            password: hashpassword,
          });
          await data.save();
          res.status(200).json({ msg: "Registered successfully" });
        }
      });
    } else {
      res.status(200).json({ msg: "user already exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ API_Status: "false", API_Message: err });
  }
};

module.exports = { login, Register };
