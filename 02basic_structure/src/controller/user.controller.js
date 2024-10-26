import User from "../models/user.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { APIError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";




export const SignUp = async (req, res) => {
    try {
        const {name,email,username,password,age} = req.body;   
        console.log( req.body);
       // check user pehle exist hai ya nahi
     const existingUser = await User.findOne({email});
     console.log(existingUser);

     if(existingUser != null){
        return res.status(400).json({
           apiError: new APIResponse(new APIError(400,"user already exist")),
        })
     }

     const hashedPassword = await bcrypt.hash(password, 10);
      // password hash karke save karna hai

     const newUser = new User({
        name,
        email,
        username,
        password : hashedPassword,
        age,
     });

        await newUser.save();

     const savedUser = await User.findOne({email}).select("-password - __V");

     console.log(savedUser);
        

       return res.status(201).json({  // 201 created
          data : new APIResponse(savedUser),
        })

        

    } catch (error) {
        const response = new APIResponse(null ,new APIError(500,error));  // default system error
            console.error(); // Log the error for debugging
            return res.status(500).json({
                response
            });
    }
}

export const SignIn = async (req, res) => {

    try {
        const {email, password} = req.body;

        console.log(req.body);

    } catch (error) {
        
    }

}


// {
 //"email": "a@a.com",
 //"password": "ashish@123",
//}