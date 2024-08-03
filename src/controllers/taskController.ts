import { NextFunction, Request, Response } from "express"
import Task from "../models/Task"
import AppError from "../utils/AppError"
import Employee from "../models/Employee"
import { NOTFoundError } from "../config"
import taskDurationValidate from "../middleware/taskDurationValiedate"
import mongoose from "mongoose"

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description, from, to, employee } = req.body

  if (!description || !from || !to || !employee) {
    return next(new AppError("All fields are required", 400))
  }

  try {
    await taskDurationValidate(from, to, employee)

    const newTask = new Task({ description, from, to, employee })
    await newTask.save()

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employee,
      { $push: { tasks: newTask._id } },
      { new: true }
    )

    if (!updatedEmployee) {
      return next(new AppError(NOTFoundError, 404))
    }

    res.status(201).json(newTask)
  } catch (error) {
    next(new AppError(error as string, 500))
  }
}

export const singleTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id
    const employeeId = req.query

    const task = await Task.findOne({
      _id: taskId,
      employee: employeeId,
    }).exec()

    if (!task) {
      return next(new AppError(NOTFoundError, 404))
    }

    const existedTask = await Task.findById({ _id: req.params.id })

    if (!existedTask) {
      return next(new AppError(NOTFoundError, 404))
    }

    res.status(201).json(existedTask)
  } catch (error) {
    next(new AppError("Failed to found  task", 500))
  }
}

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, employee, description } = req.body

    if (!description || !from || !to || !employee) {
      return next(new AppError("All fields are required", 400))
    }

    const taskId = req.params.id

    const task = await Task.findOne({
      _id: taskId,
      employee: employee,
    }).exec()

    if (!task) {
      return next(new AppError(NOTFoundError, 404))
    }

    await taskDurationValidate(from, to, employee)

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    }).exec()

    if (!updatedTask) {
      return next(new AppError(NOTFoundError, 404))
    }

    res.status(201).json(updatedTask)
  } catch (error) {
    next(new AppError(error as string, 500))
  }
}

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id
    const { employeeID } = req.query

    const task = await Task.findOne({
      _id: taskId,
      employee: employeeID,
    }).exec()

    if (!task) {
      return next(new AppError(NOTFoundError, 404))
    }

    await Task.findByIdAndDelete({
      _id: taskId,
      employee: employeeID,
    }).exec()

    await Employee.findByIdAndUpdate(
      employeeID,
      { $pull: { tasks: taskId } },
      { new: true }
    ).exec()

    res.status(204).send()
  } catch (error) {
    next(new AppError(error as string, 500))
  }
}

export const getDailySummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { employeeId, date } = req.params
  console.log({ employeeId, date })

  try {
    // Convert date to start and end of the day
    const day = new Date(date)
    const startOfDay = new Date(day)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(day)
    endOfDay.setHours(23, 59, 59, 999)

    // Get all tasks for the employee on the given day
    const tasksForDay = await Task.aggregate([
      {
        $match: {
          employee: new mongoose.Types.ObjectId(employeeId),
          startTime: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: { $subtract: ["$endTime", "$startTime"] } },
        },
      },
    ])

    console.log({ tasksForDay })
    // Calculate total hours and remaining hours
    const totalDuration =
      (tasksForDay[0]?.totalDuration || 0) / (1000 * 60 * 60) // total duration in hours
    const remainingHours = 8 - totalDuration // assuming a max of 8 hours per day

    res.status(200).json({
      totalHours: totalDuration,
      remainingHours: remainingHours,
    })
  } catch (error) {
    next(new AppError("Failed to get daily summary", 500))
  }
}
