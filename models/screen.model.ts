import mongoose, { Document, Schema, Model } from "mongoose";

// Screen Interface
export interface IScreen {
    theater: mongoose.Schema.Types.ObjectId;  
    name: string;                             // e.g., "Screen 1", "IMAX Screen"
    type: string;                             // Screen type (Standard, IMAX, etc.)
    audioSystem: string;                      // Audio system (Dolby Atmos, DTS, etc.)
    projectionType: string;                   // NEW: 2D or 3D
    isActive: boolean;                         
}

export interface IScreenDocument extends IScreen, Document {
    createdAt: Date;
    updatedAt: Date;
}

// Screen Schema
const screenSchema = new mongoose.Schema<IScreenDocument>({
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
    name: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["Standard", "IMAX", "4DX", "Dolby Atmos"], 
        default: "Standard" 
    },
    audioSystem: { 
        type: String, 
        enum: ["Dolby Atmos", "DTS", "Auro 3D", "None"], 
        default: "None" 
    },
    projectionType: { 
        type: String, 
        enum: ["2D", "3D"], 
         default: "2D"
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Screen: Model<IScreenDocument> = mongoose.model<IScreenDocument>("Screen", screenSchema);
