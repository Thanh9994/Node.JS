import { Router } from "express";
import Courses from "../models/courses.model";
import { CoursesContrller } from "../controller/courses";


const CoursesRouter = Router()

CoursesRouter.get("/", CoursesContrller.getAll)
CoursesRouter.get("/courses", CoursesContrller.create)
CoursesRouter.get("/courses/:id", CoursesContrller.update)
CoursesRouter.get("/courses/:id", CoursesContrller.delete)
CoursesRouter.get("/auth/login", CoursesContrller.login)
CoursesRouter.get("/auth/signup", CoursesContrller.signup)

export default CoursesRouter;