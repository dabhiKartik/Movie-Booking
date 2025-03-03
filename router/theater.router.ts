import  express  from "express";
import { AddTheater, updateTheater } from "../controllers/Theater.controller";
import auth from "../middleware/checkAuth";
import { checkRole } from "../utils/checkRole";

const theaterRouter = express.Router()

theaterRouter.post("/theater",auth,checkRole,AddTheater)
theaterRouter.patch("/updateTheater",auth,checkRole,updateTheater)

export default theaterRouter