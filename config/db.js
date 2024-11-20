import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URI);
      console.log("Database connected successfully.");
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
  };
  
