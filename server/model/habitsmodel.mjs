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
            default:0
        },
        completionTimeStamps:{
            type:[Date],
            default:[]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',  
            required:true,
            index:true
        }
    },
    {
        timestamps:true
    }
);
export const HabitModel=mongoose.models.habits ||mongoose.model('Habit',habitSchema);