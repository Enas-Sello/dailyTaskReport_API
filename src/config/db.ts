import mongoose from "mongoose"
import { MONGODB_URI } from "."

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string)
    console.log("MongoDB Connected")
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    process.exit(1)
  }
}

export default connectDB
