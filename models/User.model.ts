import mongoose, { Document ,Model} from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string
    phone: number
    role: string
    profile_image:string
    bookings: mongoose.Schema.Types.ObjectId ,
    token:string
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date
    updatedAt: Date
}


const UserModel = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default:"User"
    },
    profile_image:{
        type:String,
        
    },
    bookings: 
    { type: mongoose.Schema.Types.ObjectId ,
        ref: "Bookings"
    },
    token:{
        type:String
    }

}, {
    timestamps: true
})

export const User : Model<IUserDocument> = mongoose.model<IUserDocument>("User", UserModel);
 