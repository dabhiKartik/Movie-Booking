import { Request, Response, NextFunction } from "express";
import { Show } from "../models/show.model";
import { Movie } from "../models/movies.model";
import { Theater } from "../models/theater.model";
import { Screen } from "../models/screen.model";
import { validDate, isValid12HourFormat } from "../utils/validator";
import { createSeatsForShow } from "./seat.controller";
import mongoose from "mongoose";

export const AddShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            movie,
            theater,
            screenId,
            showDate,
            showTime,
            seatConfig 
        } = req.body;

        
        // Validate inputs
        const find_movie = await Movie.findById(movie);
        if (!find_movie) throw new Error("Movie not found");
        
        const find_theater = await Theater.findById(theater);
        if (!find_theater) throw new Error("Theater not found");

        const find_screen = await Screen.findById(screenId)
        if (!find_screen) {
            throw new Error("Screen not found")
        }

        const find_show = await Show.findOne({movie,
            theater,
            screenId})

if (find_show) {
    throw new Error("Show Already created")
}


if (validDate(showDate) === "false") {
    throw new Error("Please Provide valid 12Hour Format ")
}
          
     const show = await Show.create({
        movie,
        theater,
        screenId,
        showDate,
        showTime:isValid12HourFormat(showTime), 
     })
 
     await createSeatsForShow(show._id, seatConfig, show.showDate);

    //  shows
    find_theater.shows.push(show._id as mongoose.Schema.Types.ObjectId)

    await find_theater.save()

     res.status(201).json({ message: "Show created successfully", show });

    } catch (error) {
        next(error);
    }
};