//for the login and signup check middleware
const jwt = require("jsonwebtoken");
const userDetails = require("../models/Signup.model");
const { where } = require("sequelize");

const middleware = (req, res, next) => {
  const token = req?.headers?.authorization;

  try {
    if (token.length > 0) {
      jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
        const user = await userDetails.findOne({ where: { id: decoded.id } });

        req.user = user;
        // console.log("midd", decoded);

        if (err) {
          res.status(400).json({ msg: "unauthenticated" });
          throw new Error(err);
        }

        next();
      });
    } else {
      res.status(400).json({ msg: "unauthenticated" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = middleware;
