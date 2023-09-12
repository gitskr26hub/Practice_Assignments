const router=require("express").Router()



const authenticate_controller = require("../Controllers/Auth.Controller")



router.post("/register",authenticate_controller.Register)

router.post("/login", authenticate_controller.login)


module.exports=router