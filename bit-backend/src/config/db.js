import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB)
            console.log("conected db");
        
    } catch (error) {
        console.log(`error `, error);
    }
}

export default connectDB

