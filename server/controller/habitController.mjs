import { HabitModel } from "../model/habitsmodel.mjs";

export const addHabit = async (req, res) => {
    const { name } = req.body;
    const {id}=req;
    if (!name || !id|| typeof id !=='string'|| typeof name !== 'string') {
        return res.status(404).json({ status: false, message: "please enter valid habit" });
    }
    try {
        const existingHabit = await HabitModel.findOne({ name,user:id });
        if (existingHabit) {
            return res.status(409).json({ success: false, message: "habit already exists" })
        }
        const habit = new HabitModel({ name,user:id });
        await habit.save();
        return res.status(200).json({ success: true, message: 'added successfully' })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}


export const getHabits = async (req, res) => {
    const {id}=req;
    if ( !id) {
        return res.status(404).json({ status: false, message: "please enter valid id" });
    }
    try {
        const habits=await HabitModel.find({user:id});
        if(habits ==[]||habits==null||habits==undefined||habits=={}||habits=='[]'){
            return res.status(404).json({ success: false, message: "no habits yet" })
        }
        return res.status(200).json({ success: true, habits});
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

  

export const updtaeCompletedTimeStamp=async (req,res)=>{
    const {name}=req.body;
    if (!name || typeof name !== 'string') {
        return res.status(404).json({ status: false, message: "not valid habit" });
    }
    const {id}=req;
    if ( !id) {
        return res.status(404).json({ status: false, message: "please enter valid id" });
    }
    try {
        const habit=await HabitModel.findOneAndUpdate({name,user:id},{$push:{completionTimeStamps: Date.now()},$set:{lastCompletedDate:Date.now()}});
        
        if(!habit){
            return res.status(404).json({ status: false, message: "not valid habit" });
        }
    return res.status(200).json({ success: true});
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}