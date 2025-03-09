import { Request, Response, NextFunction } from "express";
import { Screen } from "../models/screen.model";
import { Movie } from "../models/movies.model";
import { Theater } from "../models/theater.model";
import mongoose from "mongoose";

export const AddScreen = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { theater, name, type, audioSystem, projectionType } = req.body;

        const find_Theater = await Theater.findById(theater);
        if (!find_Theater) {
            throw new Error("Theater not found");
        }

        const find_screen = await Screen.findOne({ name, theater });
        if (find_screen) {
            throw new Error("Please provide a different screen name");
        }

        const screen = await Screen.create({
            theater,
            name,
            type,
            audioSystem,
            projectionType,
        });
        

find_Theater.screens.push(screen._id as mongoose.Schema.Types.ObjectId);
await find_Theater.save();


        res.status(200).json({
            status: {
                code: 200,
                message: "Screen added",
                error: false,
            },
            screen,
        });
    } catch (error: any) {
        res.status(400).json({
            status: {
                code: 400,
                message: error.message || "Something went wrong",
                error: true,
            }
        });
    }
};
