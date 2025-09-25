import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.send("Danh sách người dùng");
});

usersRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json({ id, message: "Chi tiết người dùng" });
});

export default usersRouter;
