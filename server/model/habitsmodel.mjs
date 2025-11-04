import mongoose from "mongoose";

const habitSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter a habit of yours"],
            trim:true
        },
        lastCompletedDate:{
            type:Date,
            default:Date.now
        },
        completionTimeStamps:{
            type:[Date],
            default:[Date.now()]
        }
    },
    {
        timestamps:true
    }
);

export const HabitModel=mongoose.model('Habit',habitSchema);