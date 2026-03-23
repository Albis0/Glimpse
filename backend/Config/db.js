import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Local MongoDB Connected`);
    } catch (error) {
        console.log(`Failed on Local MongoDB connect. err: ${error}`);
        process.exit(1);
    }
};
export default connectDB;
