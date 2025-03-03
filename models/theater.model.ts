import mongoose, { Schema, Document, Model } from "mongoose";



export interface ITheater {
    name: string;
    location: string;
    screens: number;
    shows: mongoose.Schema.Types.ObjectId[];
}

export interface ITheaterDocument extends ITheater, Document {
    createdAt: Date;
    updatedAt: Date;   
}

const theaterSchema = new mongoose.Schema<ITheaterDocument>({
    name: { type: String, required: true     },
    location: { type: String, required: true },
    screens:{ type: Number, required: true } ,  
    shows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Show" }]
}, { timestamps: true });

export const Theater: Model<ITheaterDocument> = mongoose.model<ITheaterDocument>("Theater", theaterSchema);
   