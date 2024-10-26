import { Router } from "express";
import { SignUp , SignIn } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", SignUp);   //http://localhost:3000/users/signup
userRouter.post("/login", SignIn);  //http://localhost:3000/users/login


export default userRouter;