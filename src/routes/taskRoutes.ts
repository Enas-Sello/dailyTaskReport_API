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
  singleTask,
  updateTask,
} from "../controllers/taskController"

const router: Router = Router()

router.post("/", validateCreateTask, createTask)
router.get("/:id", validateSingleTask, singleTask)
router.put("/:id", validateUpdateTask, updateTask)
router.delete("/:id", validateDeleteTask, deleteTask)

export default router
