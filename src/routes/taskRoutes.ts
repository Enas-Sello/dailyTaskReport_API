import { Router } from "express"
import {
  validateCreateTask,
  validateDeleteTask,
  validateSingleTask,
  validateUpdateTask,
} from "../middleware/validateRequest"
import {
  createTask,
  deleteTask,
  getDailySummary,
  singleTask,
  updateTask,
} from "../controllers/taskController"

const router: Router = Router()

router.post("/", validateCreateTask, createTask)
router.get("/:id", validateSingleTask, singleTask)
router.put("/:id", validateUpdateTask, updateTask)
router.delete("/:id", validateDeleteTask, deleteTask)

router.get("/daily-summary/:employeeId/:date", getDailySummary)


export default router
