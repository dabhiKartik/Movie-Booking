import {Request,Response, NextFunction } from "express"
import { User,IUserDocument } from "../models/User.model"


declare global {
    namespace Express {
      interface Request {
        user:IUserDocument ;
      }
    }
  }


export const checkRole = async (req:Request,res:Response,next:NextFunction) =>{

    try {
        const user= await User.findOne({_id: req.user._id })

        if (user?.role ==="Admin") {
            next()
        }else{
            throw new Error('Access Denied, You are not Admin!')
        }
    } catch (error) {
        console.log(error);
        
        next(error)
        
    }
}

  

