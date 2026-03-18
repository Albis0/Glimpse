import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        imageApi: {
            type: String,
            required: true,
        },
    },
    {timestamps: true},
);

const Favorite = mongoose.model("Favorite", FavoriteSchema);
export default Favorite;
