import { Router } from "express";
import { SignUp , SignIn } from "../controller/user.controller.js";

const UserRouter = Router();

UserRouter.post("/signup", SignUp);   //http://localhost:3000/users/signup
UserRouter.post("/login", SignIn);  //http://localhost:3000/users/login


export default UserRouter;