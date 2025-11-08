import jwt from "jsonwebtoken";

export const userAuth=async(req,res,next)=>{
    const {token}=req.cookies;
    try {
        const decodeToken=jwt.verify(token,'secret');
        if(decodeToken.id){
            req.id=decodeToken.id;
        }else{
            return res.json({ success: false, message: "Unautherised" })
        }
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message});
    }
}