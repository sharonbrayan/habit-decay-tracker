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

  

export const updateCompletedTimeStamp=async (req,res)=>{
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

export const deletehabit=async(req,res)=>{
    const {name}=req.body;
    const {id}=req;
    if (!name || typeof name !== 'string') {
        return res.status(404).json({ status: false, message: "not valid habit" });
    }
    if ( !id) {
        return res.status(404).json({ status: false, message: "please enter valid id" });
    }
    try {
        const deletedItem=await HabitModel.deleteOne({name,user:id});
        if(deletedItem){
            return res.json({success:true,message:'deleted successfully'});
        }else{
            return res.status(404).json({ status: false, message: "habit not found" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const getTimeStamps=async (req,res)=>{
    const {name}=req.query;
    if (!name || typeof name !== 'string') {
        return res.status(404).json({ status: false, message: "not valid habit" });
    }
    const {id}=req;
    if ( !id) {
        return res.status(404).json({ status: false, message: "please enter valid id" });
    }
    try {
       const timeStamp=await HabitModel.findOne({name,user:id}).select('completionTimeStamps');
        
        if(!timeStamp){
            return res.status(404).json({ status: false, message: "not valid habit" });
        }
    return res.status(200).json({ success: true,timeStamp});
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}


export const getDecayScores = async (req, res) => {
  try {
    const userId = req.id;

    const habits = await HabitModel.find({ user: userId });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const response = habits.map(habit => {
      let score = 100; // starting score
      const history = habit.completionTimeStamps || [];

      // Convert array of timestamps -> Set of date strings ("YYYY-MM-DD")
      const completionDates = new Set(
        history.map(ts => new Date(ts).toISOString().split("T")[0])
      );

      const createdAt = new Date(habit.createdAt);
      createdAt.setHours(0, 0, 0, 0);

      // Simulate day-by-day scoring
      let cursor = new Date(createdAt);

      while (cursor <= today) {
        const key = cursor.toISOString().split("T")[0];

        if (completionDates.has(key)) {
          // Habit completed on this day
          score = score + (100 - score) * 0.1;
        } else {
          // Habit missed
          score = score * 0.9;
        }

        // Floor to prevent score from becoming too small
        score = Math.max(score, 5);

        cursor.setDate(cursor.getDate() + 1);
      }

      // Round final score
      score = Math.round(score);

      // Days since last completion
      let last = habit.lastCompletedDate
        ? new Date(habit.lastCompletedDate)
        : null;

      let diffDays = last
        ? Math.floor((today - last) / (1000 * 60 * 60 * 24))
        : null;

      return {
        habitId: habit._id,
        name: habit.name,
        lastCompleted: habit.lastCompletedDate || null,
        daysSinceLastCompletion: diffDays ?? "never completed",
        decayScore: score,
        completionHistory: habit.completionTimeStamps
      };
    });

    res.json({ success: true, decay: response });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
