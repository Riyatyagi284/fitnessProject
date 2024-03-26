import { app } from './app.js'
import connectDb from './config/database.js'
import dotenv from 'dotenv'
import cloudinaryConnect from './config/cloudinary.js'
import {router as userRoute} from "./route/user.js"

dotenv.config()
const port = process.env.PORT

connectDb();
cloudinaryConnect();

app.use("/api/v1/auth", userRoute)



app.listen(port, () => {
    console.log(`server Started at http://localhost:${port}`)
})
