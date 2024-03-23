import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("db connection successfull"))
        .catch((error) => console.log("db connection error"))
}

console.log("mongodb uri", process.env.MONGODB_URI)

export default dbConnection;