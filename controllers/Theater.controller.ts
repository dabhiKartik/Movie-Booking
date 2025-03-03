import { Request, Response, NextFunction } from "express";
import { Theater } from "../models/theater.model";



export const AddTheater = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            location,
            screens,
        } = req.body;

        // // Ensure all necessary fields are present (optional validation - you can add more)
        // if (!name || !location || !Array.isArray(screens)) {
        //     return res.status(400).json({
        //         status: {
        //             code: 400,
        //             message: "Invalid input data - name, location, totalScreens, and screens are required",
        //             error: true
        //         }
        //     });
        // }

        const theater = await Theater.create({
            name,
            location,
            screens,  
        });

        res.status(201).json({
            status: {
                code: 201,
                message: "Theater Created Successfully",
                error: false
            },
            data: theater
        });
    } catch (error) {
        next(error);
    }
};


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
        const { _id, name, location, screens, shows } = req.body;

        const updatedTheater = await Theater.findByIdAndUpdate(
            _id,
            { name, location, screens, shows },
            { new: true } 
        );

        if (!updatedTheater) {
            throw new Error("Theater Not Found");
        }

        res.status(200).json({
            status: {
                code: 200,
                message: "Theater updated successfully",
                error: false
            },
            theater: updatedTheater
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
