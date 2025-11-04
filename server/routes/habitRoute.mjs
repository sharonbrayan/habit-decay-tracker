import { Router } from "express";
import { addHabit, getHabits, updtaeCompletedTimeStamp } from "../controller/habitController.mjs";

export const habitRouter=Router();

habitRouter.post('/addhabit',addHabit);
habitRouter.get('/gethabits',getHabits);
habitRouter.patch('/updatetimestamp',updtaeCompletedTimeStamp);