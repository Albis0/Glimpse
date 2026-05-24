import express from "express";
import authMiddleware from "../Middleware/auth.js";
import Favorite from "../Models/Favorite.js";

const router = express.Router();
router.use(authMiddleware);

// * Get
router.get("/", async (req, res) => {
    try {
        const favorite = await Favorite.find({userId: req.user.userid});

        return res.status(200).json({favorites: favorite});
    } catch (error) {
        return res.status(500).json({message: "Favorite GET Server Error", error: error});
    }
});

// * Post
router.post("/", async (req, res) => {
    try {
        const {imageUrl, imageApi} = req.body;

        const favorite = new Favorite({
            userId: req.user.userid,
            imageUrl,
            imageApi,
        });

        await favorite.save();
        return res.status(201).json({message: "Favorite Successfully Added", favorite});
    } catch (error) {
        return res.status(500).json({message: "Favorite POST Server Error", error: error});
    }
});

// * Delete
router.delete("/:id", async (req, res) => {
    try {
        const favoriteId = req.params.id;
        if (!favoriteId) return res.status(404).json({message: "Favorite Not Found"});

        await Favorite.findOneAndDelete({_id: favoriteId, userId: req.user.userid});
        return res.status(200).json({message: "Favorite Successfully Deleted"});
    } catch (error) {
        return res.status(500).json({message: "Favorite DELETE Server Error", error: error});
    }
});

export default router;
