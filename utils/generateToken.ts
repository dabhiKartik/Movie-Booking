import jwt from "jsonwebtoken"
import dotenv from "dotenv" 
import { IUserDocument, User } from "../models/User.model";
dotenv.config();

const generateToken = async (id: string) => {
    console.log(id);
    
    const user = await User.findOne({_id:id});
    if (!user) {
        throw new Error('User Not Registered Yet!');
    }
    console.log(user);
    

    const token = jwt.sign({ id }, process.env.JWT_SECURE_KEY!, { expiresIn: '7d' });
    return token;
};

export { generateToken };