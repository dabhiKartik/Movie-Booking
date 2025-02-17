import mongoose from "mongoose";


const connectDB=async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/movies')
        console.log("mongodb connect successfully");
        
    } catch (error) {
        console.log(error);
    }
}

export default connectDB