const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const Database_Sequilize = require("./utils/database");
// console.log(Database_Sequilize);

const bp = require("body-parser");
const app = express();
/////middleware////////////////

// set port, listen for requests
const PORT = process.env.PORT || 8080;

////////////////import all routes////////////////

const authenticate_router = require("./routes/Auth");
const Post_Router = require("./routes/Post.route");
/////////////////////////////////////

app.use(bp.json({ extended: false }));
app.use(cors({ origin: "*" }));


app.get("/", (req, res) => {
    res.status(200).send("welcome here !!!");
  });



 app.use("/auth", authenticate_router);
 app.use("/data",Post_Router)



 

Database_Sequilize.sync()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}.`);
    });
    console.log("Database connection established");
  })
  .catch((err) => console.log("sequelize>", err));
