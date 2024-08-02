import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"

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

export const validateTask = [
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
