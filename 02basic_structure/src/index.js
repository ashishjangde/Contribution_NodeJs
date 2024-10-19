import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./db/connectDb.js";

dotenv.config();


const port = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
    })
})
.catch((error) => {
    console.log(`something went wrong ${error}`);
})
