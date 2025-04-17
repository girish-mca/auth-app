import express from 'express'
import { isAuthenticated, Login, Logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js'
import { userAuth } from '../middleware/userAuth.js';

export const authRouter = express.Router();

    authRouter.post('/register' , register)
    authRouter.post('/login' , Login)
    authRouter.post('/logout' , Logout)
    authRouter.post('/send-verify-otp' , userAuth , sendVerifyOtp)
    authRouter.post('/verify-account' , userAuth , verifyEmail)
    authRouter.get('/is-auth' , userAuth , isAuthenticated)
    authRouter.post('/send-reset-otp' , sendResetOtp)
    authRouter.post('/reset-password' ,  resetPassword)
