import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config()

mongoose.connect(process.env.Mongo).then(()=>{
    console.log('connected to mongodB!');
}).catch((err)=>{
    console.log(err)
});

const app=express();

app.use(express.json());

app.listen(3002, () =>{
    console.log('server is running on port 3000');
}
);

app.use("/API/user",userRouter);
app.use("/API/auth",authRouter);
app.use((err,req,res,next)=>{
    const statusCode = error.statusCode || 400;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});