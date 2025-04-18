import express from "express";
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { ENV_VARS } from "./config/envVars.js";
import path from 'path';
import cors from 'cors'


const app = express();

const PORT = ENV_VARS.PORT;



const __dirname = path.resolve();

const allowedOrigins = [
    
    'http://localhost:5173',
    'http://localhost:5001',
    'https://auth-app-dqt6.onrender.com'

  ];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));



app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

if (ENV_VARS.NODE_ENV=== 'production') {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  
  app.get("*", (req, res) => {  
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));  
  });
}





app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});