import express from "express";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import multer from "multer";
import authMiddleWare from "../Middleware/auth.js";
import getCloudinary from "../Config/cloudinary.js";
import getResend from "../Config/resetPassword.js";
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
            message: "log in success",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                profilePicture: existingUser.profilePicture,
            },
        });
    } catch (error) {
        return res.status(500).json({message: "Server Error", error: error});
    }
});

// * Profile Picture
const storage = multer.memoryStorage();
const upload = multer({storage});
router.post("/upload-pfp", authMiddleWare, upload.single("profilePicture"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({message: "No File Uploaded"});

        const cloudinary = getCloudinary();

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({folder: "glimpse-pfp"}, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            stream.end(req.file.buffer);
        });

        const updateUser = await User.findByIdAndUpdate(req.user.userid, {profilePicture: result.secure_url}, {new: true});

        res.status(200).json({
            message: "Profile Picture Updated",
            profilePicture: updateUser.profilePicture,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error", error: error});
    }
});

// * Forgot Password
router.post("/forgot-password", async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(404).json({message: "User Not Found"});

        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15dk
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const resend = getResend();
        await resend.emails.send({
            from: "Glimpse <onboarding@resend.dev>",
            to: email,
            subject: "Reset your Glimpse password",
            html: `<p>Click to reset your password (valid for 15 minutes) </p><a href="${resetUrl}">${resetUrl}</a>`,
        });

        res.status(200).json({message: "Reset Link Sent"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error", error});
    }
});

router.post("reset-password/:token", async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now()},
        });
        if (!user) return res.status(400).json({message: "Invalid or Expired Token"});

        user.password = await bcryptjs.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({message: "Password Reset Successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error", error});
    }
});

export default router;
