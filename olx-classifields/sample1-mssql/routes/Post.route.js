const router = require("express").Router();

const Post_Controller = require("../Controllers/Post.Controller");
const middleware = require("../middleware/middleware");


router.post("/create", middleware, Post_Controller.Create_Data);
router.post("/get", middleware, Post_Controller.Fetch_Data);

router.post("/getonlybyuser", middleware, Post_Controller.Fetch_Data_onlyByUser)
router.delete("/delete", middleware, Post_Controller.Delete_byUser)

module.exports = router;
