import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';

dotenv.config();

mongoose.connect(process.env.Mongo).then(() => {
    console.log('connected to MongoDB!');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/API/user", userRouter);
app.use("/API/auth", authRouter);
app.use("/API/listing", listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 400;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
});
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log('server is running on port 3002');
});
