import express from 'express';
import dotenv from "dotenv";
dotenv.config()
import connectDB from './config/db.js';
import authRouter from './routes/auth_routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
 


const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
})) 
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);

connectDB();
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  