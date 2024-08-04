import { NextFunction, Request, Response } from "express";
import Task from "../models/Task";
import AppError from "../utils/AppError";
import Employee from "../models/Employee";
import { NOTFoundError } from "../config";
import mongoose from "mongoose";
import taskDurationValidate from "../utils/taskDurationValiedate";
import { PaginatedResult, paginate } from "../utils/pagination";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description, from, to, employee } = req.body;

  if (!description || !from || !to || !employee) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    await taskDurationValidate(from, to, employee);

    const newTask = new Task({ description, from, to, employee });
    await newTask.save();

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employee,
      { $push: { tasks: newTask._id } },
      { new: true }
    );

    if (!updatedEmployee) {
      return next(new AppError(NOTFoundError, 404));
    }

    res.status(201).json(newTask);
  } catch (error) {
    next(new AppError(error as string, 500));
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeeId = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const tasks = await Task.find({ employee: employeeId }).exec();

    if (!tasks) {
      return next(new AppError("Tasks not found", 404));
    }

    const paginatedTasks: PaginatedResult<any> = paginate(tasks, page, limit);

    res.status(200).json(paginatedTasks);
  } catch (error) {
    next(new AppError("Failed to retrieve tasks", 500));
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, employee, description } = req.body;

    if (!description || !from || !to || !employee) {
      return next(new AppError("All fields are required", 400));
    }

    const taskId = req.params.id;

    const task = await Task.findOne({
      _id: taskId,
      employee: employee,
    }).exec();

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    await taskDurationValidate(from, to, employee, taskId);

    task.description = description;
    task.from = from;
    task.to = to;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    next(new AppError((error as string) || "Internal Server Error", 500));
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    const { employeeID } = req.query;

    const task = await Task.findOne({
      _id: taskId,
      employee: employeeID,
    }).exec();

    if (!task) {
      return next(new AppError(NOTFoundError, 404));
    }

    await Task.findByIdAndDelete({
      _id: taskId,
      employee: employeeID,
    }).exec();

    await Employee.findByIdAndUpdate(
      employeeID,
      { $pull: { tasks: taskId } },
      { new: true }
    ).exec();

    res.status(204).send();
  } catch (error) {
    next(new AppError(error as string, 500));
  }
};

export const getDailySummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { employeeId, date } = req.params;

  try {
    const day = new Date(date);
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    const tasksForDay = await Task.aggregate([
      {
        $match: {
          employee: new mongoose.Types.ObjectId(employeeId),
          from: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: { $subtract: ["$to", "$from"] } },
        },
      },
    ]);

    const totalDuration =
      (tasksForDay[0]?.totalDuration || 0) / (1000 * 60 * 60);
    const remainingHours = 8 - totalDuration;

    res.status(200).json({
      totalHours: totalDuration,
      remainingHours: remainingHours,
    });
  } catch (error) {
    next(new AppError("Failed to get daily summary", 500));
  }
};
