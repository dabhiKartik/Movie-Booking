import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import dotenv from 'dotenv';

dotenv.config();



const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Please provide a valid token!');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECURE_KEY!) as jwt.JwtPayload;
        // console.log("decode:",decoded.id);

        const user = await User.findOne( { _id: decoded.id } );
        // console.log("User",user);

        if (!user) {
            throw new Error('User not found!');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: error instanceof Error ? error.message : 'Unauthorized!',
        });
    }
};

export default auth;
