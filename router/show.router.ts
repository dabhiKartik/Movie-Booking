import  express  from "express";
import { AddShow  } from "../controllers/show.controller";
import auth from "../middleware/checkAuth";
import { checkRole } from "../utils/checkRole";

const showRouter = express.Router()

showRouter.post("/show",auth,checkRole,AddShow)
// showRouter.patch("/updateTheater",auth,checkRole,updateTheater)

export default showRouter