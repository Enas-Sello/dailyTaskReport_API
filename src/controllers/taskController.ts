import { NextFunction, Request, Response } from "express"
import Task from "../models/Task"
import AppError from "../utils/AppError"
import Employee from "../models/Employee"
import { NOTFoundError } from "../config"
import taskDurationValidate from "../middleware/taskDurationValiedate"

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
    const employeeId = req.body.employee

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
    const employeeId = req.body.employee

    const task = await Task.findOne({
      _id: taskId,
      employee: employeeId,
    }).exec()

    if (!task) {
      return next(new AppError(NOTFoundError, 404))
    }

    await Task.findByIdAndDelete({
      _id: taskId,
      employee: employeeId,
    }).exec()

    await Employee.findByIdAndUpdate(
      employeeId,
      { $pull: { tasks: taskId } },
      { new: true }
    ).exec()

    res.status(204).send()
  } catch (error) {
    next(new AppError(error as string, 500))
  }
}
