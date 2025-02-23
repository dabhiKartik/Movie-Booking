import { Request,Response, NextFunction } from "express";
import { Movie } from "../models/movies.model";
import { validDate } from "../utils/validator";


export const AddMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { title, description, genre, duration, language, releaseDate } = req.body;
console.log(req.body);

        // const image = req.file

        if (typeof duration !== "number" && duration <= 0) {
            throw new Error("please provide valid value ")
        }

        if (genre.length === 0 && language.length === 0) {
            throw new Error("please Provide at least  one genre or language")
        }

        const movie = await Movie.create({
            title,
            description,
            genre,
            duration,
            language,
            releaseDate:validDate(releaseDate),
            posterUrl: req.file
        })

        res.status(200).json({
            message:"Successful"
        })

    } catch (error) {
        console.log(error);
        
next(error)
    }

}