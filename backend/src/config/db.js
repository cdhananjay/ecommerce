import mongoose from "mongoose";

export default async () => {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected!");
    }
    catch (error) {
        console.log("error connecting to mongodb", error);
    }
}