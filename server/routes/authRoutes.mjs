import { Router } from "express";
import { changePassword, changeUsername, getUser, login, logout, register } from "../controller/authController.mjs";
import { userAuth } from "../middleware/userAuth.mjs";

export const authRouter=Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.get('/userdata',userAuth,getUser);
authRouter.post('/logout',logout);
authRouter.post('/changepassword',userAuth, changePassword); 
authRouter.post('/changeusername',userAuth, changeUsername);