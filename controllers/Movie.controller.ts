import { Request, Response, NextFunction } from "express";
import { Movie } from "../models/movies.model";
import { validDate } from "../utils/validator";
import { error } from "console";


export const AddMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { title, description, genre, duration, language, releaseDate } = req.body;
        console.log(req.body);

        // const image = req.file
        console.log(req.file);

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
            releaseDate: validDate(releaseDate),
            posterUrl: req.file?.path
        })

        res.status(200).json({
            message: "Successful"
        })

    } catch (error) {
        console.log(error);

        next(error)
    }

}


export const getMovies = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { _id } = req.body;
        let movie
        if (_id) {
            movie = await Movie.findById(_id)
            if (!movie) throw new Error("Movies not found")

            res.status(200).json({
                status: {
                    code: 200,
                    message: "GetAll Movies",
                    error: true
                },
                data: {
                    _id: movie._id,
                    title: movie.title,
                    description: movie.description,
                    genre: movie.genre,
                    duration: movie.duration,
                    language: movie.language,
                    releaseDate: movie.releaseDate,
                    posterUrl: `http://localhost:3000/${movie.posterUrl.replace(/\\/g, "/")}`,
                    shows: movie.shows,
                    createdAt: movie.createdAt,
                    updatedAt: movie.updatedAt,
                }
            })

        } else {
            movie = await Movie.find()
            if (movie.length === 0) throw new Error("Movies not found")

            res.status(200).json({
                status: {
                    code: 200,
                    message: "GetAll Movies",
                    error: true
                },
                data: movie.map(movies => ({
                    _id: movies._id,
                    title: movies.title,
                    description: movies.description,
                    genre: movies.genre,
                    duration: movies.duration,
                    language: movies.language,
                    releaseDate: movies.releaseDate,
                    posterUrl: `http://localhost:3000/${movies.posterUrl}`,  //.replace(/\\/g, "/")
                    shows: movies.shows,
                    createdAt: movies.createdAt,
                    updatedAt: movies.updatedAt,
                }))
            })
        }

    } catch (error) {
        next(error)
    }

}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, title, description, genre, duration, language, releaseDate } = req.body;
        console.log(req.body);

        // const movies = await Movie.findByIdAndUpdate(_id, {}, { new: true });


        const movies = await Movie.findByIdAndUpdate( _id )
        if (!movies) {
            throw new Error("Movies not found")
        }

        if (title) movies.title = title
        if (description) {

            if (typeof duration !== "number" && duration <= 0) {
                throw new Error("please provide valid value ")
            }
            movies.description = description
        }

        if (genre) {
            if (genre.length === 0 && language.length === 0) {
                throw new Error("please Provide at least  one genre or language")
            }
            movies.genre = genre
        }



        if (duration) movies.duration = duration
        if (language){
            if (language.length === 0) {
                throw new Error("please Provide at least  one genre or language")
            }
            movies.language = language
        } 
        if (releaseDate) movies.releaseDate = validDate(releaseDate)
        if (req.file) {
            let Url = req.file?.path
            movies.posterUrl = Url
        }
await movies.save()

res.status(200).json({
    status :{
        code:200,
        message:"updated",
        error:true
    },
    movies
})
    } catch (error) {
next(error)
    }
}

export const deleteMovie  = async (req:Request,res:Response,next:NextFunction)=>{

try {
    const {_id} =req.body;

const movie = await Movie.findByIdAndDelete(_id)

if (!movie) {
    throw new Error("Movie bot found")
}

res.status(200).json({
    status:{
        code:200,
        message:"deleted",
        error:true
    }
})
} catch (error) {
    next(error)
}
}

export const searchMovie = async (req: Request, res: Response,next:NextFunction)=> {
    try {
        const { title, genre, language } = req.query;

        let filter: Record<string, any> = {};

        if (title && typeof title === 'string') {
            filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }
        
        if (genre && typeof genre === 'string') {
            filter.genre = { $regex: genre, $options: 'i' }; // Case-insensitive search in genre
        }
        
        if (language && typeof language === 'string') {
            filter.language = { $regex: language, $options: 'i' }; // Case-insensitive search in language
        }

        const movies = await Movie.find(filter);

        res.status(200).json({
            status: { code: 200, message: 'Movies retrieved successfully', error: false },
            movies
        });
    } catch (error) {
      next(error)
    }
};



