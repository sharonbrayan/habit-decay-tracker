import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter the username']
    },
    password: {
        type: String,
        required: [true, 'enter the password']
    }
})

export const userModel = mongoose.models.User || mongoose.model('User', userSchema);