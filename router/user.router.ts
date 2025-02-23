import {registerUser,login} from "../controllers/User.controller"
import express  from "express"
import  auth  from "../middleware/checkAuth";

const UserRouter=express.Router();

UserRouter.post("/register",registerUser)
UserRouter.get("/login",login)
UserRouter.get('/checkAuth',auth)  
export default UserRouter