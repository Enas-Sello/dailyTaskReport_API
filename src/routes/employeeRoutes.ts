import { Router } from "express"
import { validateEmployee, validateGetEmployee } from "../middleware/validateRequest"
import { createEmployee, getEmployee } from "../controllers/employeeController"

const router: Router = Router()

router.post("/", validateEmployee, createEmployee)
router.get("/", validateGetEmployee, getEmployee)

export default router
