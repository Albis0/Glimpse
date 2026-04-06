import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import authRouter from "./Routes/auth.js";
import favoritesRouter from "./Routes/favorites.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/favorites", favoritesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Working on ${PORT} Port`);
});
