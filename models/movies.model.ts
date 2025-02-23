import mongoose, { Schema, Document, Model } from "mongoose";


export interface Movie {
  title: string;
  description: string;
  genre: string[];
  duration: number;
  language: string[];
  releaseDate: string;
  posterUrl: string;
  rating: number;
  shows: mongoose.Types.ObjectId[]; 
}

export interface IMovie extends Movie, Document {
  createdAt: Date; 
  updatedAt: Date;
}


const movieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: [String], required: true },
    duration: { type: Number, required: true },
    language: { type: [String], required: true },
    releaseDate: { type: String, required: true },
    posterUrl: { type: String }, 
    rating: { type: Number, min: 1, max: 10 },
    shows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Show" }], // ✅ Fixed array type
  },
  { timestamps: true }
);


export const Movie: Model<IMovie> = mongoose.model<IMovie>("Movie", movieSchema);
