import  express  from "express";
import { AddMovie } from "../controllers/Movie.controller";
import auth from "../middleware/checkAuth";
import { checkRole } from "../utils/checkRole";
import upload from "../middleware/multer";
const movieRouter = express.Router()

  movieRouter.post("/createMovie",auth,checkRole,upload.single("posterUrl"),AddMovie)

  export default movieRouter