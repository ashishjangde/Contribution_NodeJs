import User from "../models/user.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { APIError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"




export const SignUp = async (req, res) => {
    try {
        // requirement
        const { name, username, email, password, age } = req.body;

        // field verification
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                data: new APIResponse(null, new APIError(400, "All fields are required"))    // data  //
            });
        }
        // check if user already exists
        const existingUser = await User.findOne({
            email,
            isverified: true
        });

        if (existingUser) {
            return res.status(400).json({
                data: new APIResponse(null, new APIError(400, "User already exists"))    // data  //
            });
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10) //salt rounds -> 10 rounds 

        // verification code generation
        const verificationCode = Math.floor(Math.random() * 900000) + 100000;

        const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);  // 10 minutes

        // create new user 
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            age,
            verificationCode,
            verificationCodeExpiry
        });

        // send verification code
        // send email  --> send email to user

        // save user to database
        await newUser.save();

        return res.status(201).json({
            data: new APIResponse(newUser)
        });


    } catch (error) {

        return res.status(500).json({
            data: new APIResponse(null, new APIError(500, error))
        });
    }
}

export const SignIn = async (req, res) => {

    try {
        // requirements
        const { email, password } = req.body;

        // field verification
        if (!email || !password) {
            return res.status(400).json({
                data: new APIResponse(null, new APIError(400, "All fields are required"))    // data  //
            });
        }

        // check if user exists
        const existingUser = await User.findOne({
            email,
            isverified: true
        });

        if (!existingUser) {
            return res.status(400).json({
                data: new APIResponse(null, new APIError(400, "User not found"))    // data  //
            });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); // normal ko hash karega fir companre karega  or return karega true false

        if (!isPasswordCorrect) {
            return res.status(400).json({
                data: new APIResponse(null, new APIError(400, "Password is incorrect"))    // data  //    
            });
        }

        // generate token
        const accessToken = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email
            },
            process.env.JWTTOKENSECRET,
            {
                expiresIn: "10m"
            });

        const refreshToken = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email
            },
            process.env.REFRESHTOKENSECRET,
            {
                expiresIn: "1y"
            });

            // ek token ko apne pass save kar lia
            existingUser.token = refreshToken;   //satabase me store kara lia ek token 
            
            // save the user
            existingUser.save();

            const userTobeSent =  User.findOne({email}).select("-password -token -verificationCode -verificationCodeExpiry");
           
            res.status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,   // ko access karne ke liye // backend acess only
                path: "/",  // kis path me set karne ke liye
            })
            .json({
                data: new APIResponse(userTobeSent, accessToken)
            });

    } catch (error) {
        return res.status(500).json({
            data: new APIResponse(null, new APIError(500, error))
        });

    }

}



// {
//"email": "a@a.com",
//"password": "ashish@123",
//}
