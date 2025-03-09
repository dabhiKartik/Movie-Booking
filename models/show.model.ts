import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShow {
    movie: mongoose.Schema.Types.ObjectId;
    theater: mongoose.Schema.Types.ObjectId;
    screenId: mongoose.Schema.Types.ObjectId;
    showDate: string;
    showTime: string;
}  
      
export interface IShowDocument extends IShow, Document {
    createdAt: Date;
    updatedAt: Date;
}

const showSchema = new mongoose.Schema<IShowDocument>(
    {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
        theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
        screenId: { type: mongoose.Schema.Types.ObjectId, required: true },
        showDate: { type: String, required: true },
        showTime: { type: String, required: true },
    },
    { timestamps: true }
);

export const Show: Model<IShowDocument> = mongoose.model<IShowDocument>("Show", showSchema);
