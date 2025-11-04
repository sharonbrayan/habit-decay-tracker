import express from 'express';
import { connectDb } from './config/mongodb.mjs';
import { habitRouter } from './routes/habitRoute.mjs';

const app=express();

connectDb();

app.use(express.json());

app.use('/api',habitRouter);

app.get('/',(req,res)=>{
    res.send('hello');
})
app.listen(4000,()=>{
    console.log('server is running on port 4000');
}) 