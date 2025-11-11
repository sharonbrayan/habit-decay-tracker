import { userModel } from "../model/usermodel.mjs";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password || typeof name !== 'string' || typeof password !== 'string') {
        return res.status(404).json({ success: false, message: "please enter valid name and password" });
    }
    try {
        const existingUser = await userModel.findOne({ name });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "user already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await new userModel({ name, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: false
        })


        return res.json({ success: true, message: "user registered successfully" });

    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { password, name } = req.body;
    if (!name || !password || typeof name !== 'string' || typeof password !== 'string') {
        return res.status(404).json({ success: false, message: "please enter valid name and password" });
    }
    try {
        const user = await userModel.findOne({ name });
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ success: false, message: "password doesn't match" });
        }

        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: false
        })
        return res.json({ success: true, message: "Logged In" });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}


export const getUser = async (req, res) => {
    const { id } = req;
    const user = await userModel.findById(id);
    if (!user) {
        return res.json({ success: false, message: 'user not found' })
    }
    return res.json({ success: true, user })
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })
        return res.json({ success: true, message: "logged out successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req;
    if (!oldPassword || !newPassword) {
        return res.status(404).json({ success: false, message: "please enter password" });
    }
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.json({ success: false, message: "password doesn't match to your old password" });
        }
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = newHashedPassword;
        await user.save();
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const changeUsername = async (req, res) => {
    const { newName } = req.body;
    const { id } = req;
    if (!newName || typeof newName !== 'string') {
        return res.status(404).json({ success: false, message: "please enter valid username" });
    }
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        } else if (user.name === newName) {
            return res.json({ success: false, message: "username is same" });
        }

        user.name = newName;
        await user.save();
        return res.json({ success: true, message: 'username changed successfully' })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}