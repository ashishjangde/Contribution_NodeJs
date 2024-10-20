import User from "../models/user.model.js";

// {
 //"name": "Ashish Jangde",
 //"email": "a@a.com",
 //"username": "ashish",
 //"password": "ashish@123",
// "age": 23
//}

export const SignUp = async (req, res) => {
    try {
        const {name,email,username,password,age} = req.body;   

        console.log(req.body); 

    } catch (error) {
        
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