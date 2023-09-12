//for the login and signup check middleware
const jwt = require("jsonwebtoken");
const userDetails = require("../Models/Auth.Model");


const middleware = (req, res, next) => {
  const token = req?.headers?.authorization;

  try {
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
        const user = await userDetails.where().findOne({ _id: decoded.id });

        req.user = user;
        // console.log("midd", decoded,user);

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
