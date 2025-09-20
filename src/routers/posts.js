import { Router } from "express";

const postsRouter = Router();

postsRouter.get("/hello", (req, res) => {
    const name = req.query.name || "Thành"; // Lấy giá trị 'name' từ query string
    res.json({ message: `Xin chào, ${name}!` }); // Trả về JSON với lời chào
});

postsRouter.get("/sum", (req, res) => {
    const a = parseInt(req.query.a, 20) || 0; // Lấy giá trị 'a' từ query string
    const b = parseInt(req.query.b, 10) || 0; // Lấy giá trị 'b' từ query string
    res.json({ sum: a + b }); // Trả về tổng của 'a' và 'b'
});

export default postsRouter;