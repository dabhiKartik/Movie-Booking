import  express  from "express";
import { AddMovie,getMovies,update,deleteMovie,searchMovie } from "../controllers/Movie.controller";
import auth from "../middleware/checkAuth";
import { checkRole } from "../utils/checkRole";
import upload from "../middleware/multer";
const movieRouter = express.Router()

  movieRouter.post("/createMovie",auth,checkRole,upload.single("posterUrl"),AddMovie)
movieRouter.get("/getMovies",getMovies)
movieRouter.patch("/updatemovie",auth,checkRole,upload.single("posterUrl"),update)
movieRouter.get("/searchMovie",searchMovie)
  export default movieRouter