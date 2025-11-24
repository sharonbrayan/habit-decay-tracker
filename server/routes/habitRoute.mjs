import { Router } from "express";
import { addHabit, deletehabit, getDecayScores, getHabits, getTimeStamps, updateCompletedTimeStamp } from "../controller/habitController.mjs";
import { userAuth } from "../middleware/userAuth.mjs";

export const habitRouter=Router();

habitRouter.post('/addhabit',userAuth, addHabit);
habitRouter.get('/gethabits',userAuth, getHabits);
habitRouter.patch('/updatetimestamp',userAuth,updateCompletedTimeStamp); 
habitRouter.delete('/deletehabit',userAuth,deletehabit);
habitRouter.get('/gettimestamps',userAuth,getTimeStamps);
habitRouter.get("/decay-score", userAuth, getDecayScores);  