import { Router } from "express";
import { getAll, login, signUp } from "../controllers/users.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/signup", signUp )

userRouter.post("/login", login )

userRouter.get("/me", authMiddleware, adminMiddleware, getAll )

export default userRouter