import { Router } from "express"
import { validateTask } from "../middleware/validateRequest"
import {
  createTask,
  deleteTask,
  singleTask,
  updateTask,
} from "../controllers/taskController"

const router: Router = Router()

router.post("/", validateTask, createTask)
router.get("/:id", singleTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router
