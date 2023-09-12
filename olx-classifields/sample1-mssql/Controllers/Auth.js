const sequelize = require("sequelize");
const Database_Sequilize = require("../utils/database");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userDataModel = require("../models/Signup.model");

// for login backend only
const login = async (req, res) => {
  const { auth, password } = req.body;

  try {
    const user = await Database_Sequilize.query(
      `SELECT email,password,id,username FROM application.dbo.userData where email='${auth}' or username='${auth}' `,
      { type: QueryTypes.SELECT }
    );

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (err) {
          console.log(err);
          throw new Error(err);
        }

        if (result) {
          // console.log(user[0])
          const token = jwt.sign(
            { id: user[0].id, username: user[0].username },
            process.env.SECRET_KEY
          );
          // console.log('token',token);
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
const SignIn = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userExist = await Database_Sequilize.query(
      `select email from application.dbo.userData  where email='${email}' OR username='${username}'`,
      { type: QueryTypes.SELECT }
    );

    if (userExist.length === 0) {
      const salt = bcrypt.genSaltSync(15);
      bcrypt.hash(password, salt, function (err, hashpassword) {
        // Store hash in your password DB.
        if (err) console.log(err);
        else {
          userDataModel.create({
            email: email,
            username: username,
            password: hashpassword,
          });
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

module.exports = { login, SignIn };

// function createToken(User, Password, databaseId) {
//   return jwt.sign(
//     { UserId: User, Password: Password, databaseId: databaseId },
//     process.env.Secret_key
//     // {expiresIn:"1ms"}
//   );
// }
