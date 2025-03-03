import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShow {
    movie: mongoose.Schema.Types.ObjectId;
    theater: mongoose.Schema.Types.ObjectId;
    screenNumber: number;
    showDate: Date;
    showTime: string;
}

export interface IShowDocument extends IShow, Document {
    createdAt: Date;
    updatedAt: Date;
}

const showSchema = new mongoose.Schema<IShowDocument>(
    {
        movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
        theater: { type: Schema.Types.ObjectId, ref: "Theater", required: true },
        screenNumber: { type: Number, required: true },
        showDate: { type: Date, required: true },
        showTime: { type: String, required: true },
    },
    { timestamps: true }
);

export const Show: Model<IShowDocument> = mongoose.model<IShowDocument>("Show", showSchema);
