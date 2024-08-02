import { Router } from "express"
import { validateEmployee } from "../middleware/validateRequest"
import { createEmployee, getEmployee } from "../controllers/employeeController"

const router: Router = Router()

router.post("/", validateEmployee, createEmployee)
router.get("/", getEmployee)

export default router
