import { Request, Response, NextFunction } from "express";
// import { User } from "../models/User.model";
import { User } from "../models/User.model";
import { emailValidator, StrongPassword, validMobileNumber } from "../utils/validator"
import { hash_pass,comp_pass } from "../utils/password"
import { generateToken } from "../utils/generateToken";
import { error } from "console";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password, phone } = req.body;

        const registerUser = await User.findOne({ email })
        if (registerUser) {
            throw new Error("User Already Register")
        }

        emailValidator(email)
        StrongPassword(password)
        validMobileNumber(phone)

        const Reg_User = await User.create({
            name,
            email,
            password:await hash_pass(password),
            phone
        })


        res.status(200).json({
            status:{
                status:200,
                message:"Register",
                error:false
            },
            Reg_User
    
        })


    } catch (error) {
next(error)
// console.log(error);

    }



}

export const login = async(req:Request,res:Response,next:NextFunction) =>{


    try {
        
const {email,password} =req.body;

const Find_User = await User.findOne({email})


if (!Find_User) {
    throw new Error('User not register')
}



comp_pass(password,Find_User.password)

const Token=  await generateToken(Find_User.id)
console.log(Token);
Find_User.token=Token

await Find_User.save()

res.status(200).json({
    status:{
        code:200,
        message:"login",
        error:false
    },
    Token
})

    } catch (error) {
        next(error) 
        console.log(error);
        
    }
}

// export const checkAuth1 = async (req: Request, res: Response) => {
//     try {
//         const userId = req.id;
//         const user = await User.findById(userId).select("-password");
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         };
//         return res.status(200).json({
//             success: true,
//             user
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };