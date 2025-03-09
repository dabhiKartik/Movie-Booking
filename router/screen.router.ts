import  express  from "express";
import { AddScreen  } from "../controllers/Screen.controller";
import auth from "../middleware/checkAuth";
import { checkRole } from "../utils/checkRole";

const screenRouter = express.Router()

screenRouter.post("/screen",auth,checkRole,AddScreen)
// showRouter.patch("/updateTheater",auth,checkRole,updateTheater)

export default screenRouter