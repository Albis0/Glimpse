import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const router = express.Router();

// * SIGN UP
router.post("/signup", async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if (existingUser) return res.status(400).json({message: "User Already Exist"});

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({message: "User Successfully Created"});
    } catch (error) {
        return res.status(500).json({message: "Server Error", error: error});
    }
});

// * LOG IN
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (!existingUser) return res.status(404).json({message: "User Not Found"});

        const isPasswordMatch = await bcryptjs.compare(password, existingUser.password);
        if (!isPasswordMatch) return res.status(400).json({message: "Wrong Password"});

        const token = jwt.sign({userid: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
        res.status(200).json({
            message: "log in complete",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        });
    } catch (error) {
        return res.status(500).json({message: "Server Error", error: error});
    }
});

export default router;
