import mongoose from "mongoose"
import Task from "../models/Task"
import AppError from "../utils/AppError"

export default async function (from: Date, to: Date, employee: any) {
  const start = new Date(from)
  const end = new Date(to)

  const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  if (duration > 8) {
    throw new AppError("Task duration cannot exceed 8 hours", 400)
  }

  const startOfDay = new Date(start)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(start)
  endOfDay.setHours(23, 59, 59, 999)

  const tasksForDay = await Task.aggregate([
    {
      $match: {
        employee: new mongoose.Types.ObjectId(employee),
        from: { $gte: startOfDay, $lte: endOfDay },
      },
    },
    {
      $group: {
        _id: null,
        totalDuration: { $sum: { $subtract: ["$to", "$from"] } },
      },
    },
  ])

  const totalDuration = (tasksForDay[0]?.totalDuration || 0) / (1000 * 60 * 60)

  if (totalDuration + duration > 8) {
    throw new AppError("Total daily task duration cannot exceed 8 hours", 400)
  }
}
