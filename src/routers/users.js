import { Router } from "express";
import { getAll, login, signUp } from "../controllers/users.controller";

const userRouter = Router();

userRouter.post("/sigup", signUp )

userRouter.post("/login", login )

userRouter.get("/", getAll )

export default userRouter