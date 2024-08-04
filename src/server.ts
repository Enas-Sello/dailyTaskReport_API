import express, { Application, Request, Response, NextFunction } from "express"
import connectDB from "./config/db"
import { CORS, PORT } from "./config"
import cookieParser from "cookie-parser"
import cors from "cors"
import employeeRoutes from "./routes/employeeRoutes"
import taskRoutes from "./routes/taskRoutes"
import AppError from "./utils/AppError"
import errorHandler from "./middleware/errorHandler"

const app: Application = express()
connectDB()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: CORS,
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

module.exports = (req: Request, res: Response) => {
  res.status(200).send("Hello, world!")
}
app.use("/api/employees", employeeRoutes)
app.use("/api/tasks", taskRoutes)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
