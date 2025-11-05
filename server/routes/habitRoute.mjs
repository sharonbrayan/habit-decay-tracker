import { Router } from "express";
import { addHabit, getHabits, updtaeCompletedTimeStamp } from "../controller/habitController.mjs";
import { userAuth } from "../middleware/userAuth.mjs";

export const habitRouter=Router();

habitRouter.post('/addhabit',userAuth, addHabit);
habitRouter.get('/gethabits',userAuth, getHabits);
habitRouter.patch('/updatetimestamp',userAuth,updtaeCompletedTimeStamp);