import express from 'express';
import { connectDb } from './config/mongodb.mjs';
import { habitRouter } from './routes/habitRoute.mjs';
import { authRouter } from './routes/authRoutes.mjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";

const app=express();
dotenv.config();

connectDb();

app.use(express.json()); 
app.use(cors({
  origin: [ 
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://192.168.13.233:5173'
  ],
  credentials: true
}));
app.use(cookieParser())


app.use('/api',habitRouter);  
app.use('/api',authRouter);
app.get('/',(req,res)=>{
    res.send('hello');
})
app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`server is running on port ${process.env.PORT}`);
}) 