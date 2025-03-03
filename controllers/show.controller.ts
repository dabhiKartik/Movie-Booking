import { Request, Response, NextFunction } from "express";
import { Show } from "../models/show.model";
import { Movie } from "../models/movies.model";
import { Theater } from "../models/theater.model";
import { validDate, isValid12HourFormat } from "../utils/validator";
import { createSeatsForShow } from "./seat.controller";

export const AddShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            movie,
            theater,
            screenNumber,
            showDate,
            showTime,
            seatConfig 
        } = req.body;

        
        // Validate inputs
        const find_movie = await Movie.findById(movie);
        if (!find_movie) throw new Error("Movie not found");
        
        const find_theater = await Theater.findById(theater);
        if (!find_theater) throw new Error("Theater not found");
        
        validDate(showDate);
        isValid12HourFormat(showTime);


         
     const show = await Show.create({
        movie,
        theater,
        screenNumber,
        showDate,
        showTime,
     })
 
     await createSeatsForShow(show._id, seatConfig);

     res.status(201).json({ message: "Show created successfully", show });

    } catch (error) {
        next(error);
    }
};