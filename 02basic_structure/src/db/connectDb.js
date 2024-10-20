import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// sync promise return nahi karta hai instant value expect karta hai 
export const connectDb = async () => {   //async promise return karta hai or y 2 call back deta hai .then .catch we can also do .then chaining
    try {
        const db = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);

        console.log(`DB connected successfully ${db.connection.host}`);
       
    } catch (error) {
       console.error(`something went wrong ${error}`);  
       process.exit(1);
} 
}
