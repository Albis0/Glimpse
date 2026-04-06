import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import multer from "multer";
import authMiddleWare from "../Middleware/auth.js";
import getCloudinary from "../Config/cloudinary.js";
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
export default router;
