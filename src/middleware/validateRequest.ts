import { Request, Response, NextFunction } from "express"
import { body, param, validationResult, query } from "express-validator"

export const validateEmployee = [
  body("name").not().isEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]
export const validateGetEmployee = [
  query("name").not().isEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export const validateCreateTask = [
  body("description").not().isEmpty().withMessage("Description is required"),
  body("from").isISO8601().withMessage("Start time must be a valid date"),
  body("to").isISO8601().withMessage("End time must be a valid date"),
  body("employee").not().isEmpty().withMessage("Employee ID is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export const validateUpdateTask = [
  param("id").isMongoId().withMessage("Invalid Task ID"),
  body("description").not().isEmpty().withMessage("Description is required"),
  body("from").isISO8601().withMessage("Start time must be a valid date"),
  body("to").isISO8601().withMessage("End time must be a valid date"),
  body("employee").not().isEmpty().withMessage("Employee ID is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export const validateSingleTask = [
  param("id").isMongoId().withMessage("Invalid Task ID"),
  query("employee").not().isEmpty().withMessage("Employee is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export const validateDeleteTask = [
  param("id").isMongoId().withMessage("Invalid Task ID"),

  body("employee").not().isEmpty().withMessage("Employee ID is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]
