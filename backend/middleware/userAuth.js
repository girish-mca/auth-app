import jwt from "jsonwebtoken"
import 'dotenv/config';



export const userAuth = async(req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return res.json({success : false , message : "Not authorized. Login again"})
    }

    try {
        const tokenDecode = jwt.verify(token , process.env.JWT_TOKEN)

        if(tokenDecode.id){
            req.userId = tokenDecode.id;
            next();
        }else{
            return res.json({success : false , message : "not authorized . login again"})
        }

       

    } catch (error) {
        return res.json({success : false  , message : error.message})
    }
}