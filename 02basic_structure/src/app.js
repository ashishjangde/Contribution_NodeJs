import express from "express";
import UserRouter from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();



app.use(express.json());  // ye parse json data

app.use(cors({
    origin:["http://localhost:6000"],  // koi bhi url agr is se match karta hai to ye usse listen kar lega
    credentials:true     // auth cookies sending or accesss
}));

app.use(express.urlencoded({extended:true}));  // jo bhi encrypted value aayegi url se usko decode karega
app.use(express.static("public"));  // jo front end se file bhejenge usko public folder me store karega
app.use(cookieParser());  // set unset cookies


app.use("/users", UserRouter);  //hhtp://localhost:3000/users/signup



export default app;