import dotenv from "dotenv"
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI
export const PORT = process.env.PORT || 8800
export const CORS = process.env.CORS_URL

export const NOTFoundError = "Not Found"
