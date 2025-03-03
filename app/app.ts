import express, { Request, Response, NextFunction } from "express";
import UserRouter from "../router/user.router"
import bodyParser from "body-parser";
const app = express();

import dotenv from "dotenv" 
import movieRouter from "../router/movie.router";
import path from "path";
import theaterRouter from "../router/theater.router";
import showRouter from "../router/show.router"

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/avatar", express.static(path.join(__dirname, "../avatar")));
//Define a custom error interface
interface CustomError extends Error {
  statusCode?: number;
}


app.use(bodyParser.json())

app.use(UserRouter)
app.use(movieRouter)
app.use(theaterRouter)
app.use(showRouter)
// Error-handling middleware
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 400;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    status: {
      code: statusCode,
      message: message,
      error: true
    }
  });
});

export default app;
