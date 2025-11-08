import express from 'express';
import { connectDb } from './config/mongodb.mjs';
import { habitRouter } from './routes/habitRoute.mjs';
import { authRouter } from './routes/authRoutes.mjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express();

connectDb();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true                  
}))

app.use(cookieParser())


app.use('/api',habitRouter);
app.use('/api',authRouter);
app.get('/',(req,res)=>{
    res.send('hello');
})
app.listen(4000,()=>{
    console.log('server is running on port 4000');
}) 