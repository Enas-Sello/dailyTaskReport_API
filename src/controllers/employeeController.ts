import { NextFunction, Request, Response } from "express"
import Employee from "../models/Employee"
import AppError from "../utils/AppError"
import { NOTFoundError } from "../config"

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body
  try {
    if (!name) {
      return next(new AppError("Name  are required", 400))
    }

    const newEmployee = await new Employee({ name: name }).save()
    res.status(201).json(newEmployee)
  } catch (error) {
    next(new AppError("Failed to create employee", 500))
  }
}

export const getEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.query
  console.log("dd", name)
  try {
    const employee = await Employee.findOne({ name: name })
      .populate("tasks")
      .exec()
    if (!employee) {
      return next(new AppError(NOTFoundError, 404))
    }

    res.status(201).json(employee)
  } catch (error) {
    next(new AppError(error as string, 500))
  }
}
