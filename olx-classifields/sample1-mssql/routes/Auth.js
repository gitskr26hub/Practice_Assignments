const router = require ('express').Router();

const authenticate_controller = require("../Controllers/Auth")



router.post("/register",authenticate_controller.SignIn)

router.post("/login", authenticate_controller.login)


module.exports=router