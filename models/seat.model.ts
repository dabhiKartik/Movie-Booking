import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISeat {
    show: mongoose.Schema.Types.ObjectId;
    seatNumber: string;   // A1, A2, etc.
    type: string;         // Gold, Silver
    price: number;
    isBooked: boolean;
}

export interface ISeatDocument extends ISeat, Document {
    createdAt: Date;
    updatedAt: Date;
}

const seatSchema = new mongoose.Schema<ISeatDocument>(
    {
        show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
        seatNumber: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        isBooked: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Seat: Model<ISeatDocument> = mongoose.model<ISeatDocument>("Seat", seatSchema);
