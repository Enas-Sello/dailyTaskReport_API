import { Router } from "express"
import {
  validateCreateTask,
  validateDeleteTask,
  validateTasks,
  validateUpdateTask,
} from "../middleware/validateRequest"
import {
  createTask,
  deleteTask,
  getDailySummary,
  getTasks,
  updateTask,
} from "../controllers/taskController"

const router: Router = Router()

router.post("/", validateCreateTask, createTask)
router.get("/:id", getTasks)
router.put("/:id", validateUpdateTask, updateTask)
router.delete("/:id", validateDeleteTask, deleteTask)

router.get("/daily-summary/:employeeId/:date", getDailySummary)


export default router
