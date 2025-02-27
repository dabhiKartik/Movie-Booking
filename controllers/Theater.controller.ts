import { Request, Response, NextFunction } from "express";
import { Theater } from "../models/theater.model";


export const AddTheater = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {
            name,
            location,
            totalScreens,
            shows
        } = req.body;

        const theater = await Theater.create({
            name,
            location,
            totalScreens,
            shows
        })

        res.status(200).json({

            status: {
                code: 200,
                message: "Create",
                error: false
            },
            Theater
        })
    } catch (error) {
        next(error)
    }
}

export const getTheater = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { _id } = req.body

        let theater

        if (_id) {
            theater = await Theater.findById(_id)
        } else {
            theater = await Theater.find()
        }


        res.status(200).json({
            status: {
                code: 200,
                message: "GET MOVIES",
                error: false
            },
            theater
        })

    } catch (error) {
        next(error)
    }

}


export const updateTheater = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, name, location, totalScreens, shows } = req.body;

        const theater = await Theater.findById(_id);  // Correct method

        if (!theater) {
            throw new Error("Theater Not Found");
        }

        if (name) theater.name = name;
        if (location) theater.location = location;
        if (totalScreens) theater.totalScreens = totalScreens;
        if (shows) theater.shows = shows;

        await theater.save();

        res.status(200).json({
            status: {
                code: 200,
                message: "Theater updated successfully",
                error: true
            },
            theater
        });

    } catch (error) {
        next(error);
    }
};


export const deleteTheater = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.body;

        const theater = await Theater.findByIdAndDelete(_id);

        if (!theater) {
           throw new Error("Theater not found")
        }

        res.status(200).json({
           status :{
            code:200,
            message: "Theater deleted successfully",
        error:true}
        });

    } catch (error) {
        next(error);
    }
};
