import express from "express";
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";
import dotenv from 'dotenv'
import userRouter from "./routes/userRoutes.js";

import path from 'path';
import cors from 'cors'

 dotenv.config()

const app = express();





const __dirname = path.resolve();

const allowedOrigins = [
    
    'http://localhost:5001',
    'http://localhost:5173'

    

  ];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));



app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV=== 'production') {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  
  app.get("*", (req, res) => {  
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));  
  });
}







app.listen(5001, () => {
	console.log(`Server started at http://localhost:5001`);
	connectDB();
});