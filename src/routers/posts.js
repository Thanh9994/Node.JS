import { Router } from "express";
import {postsController} from "../controllers/postsController.js";


const postsRouter = Router();


postsRouter.get("/", postsController.getPosts);

postsRouter.get("/:id", postsController.getPostById);

postsRouter.delete("/:id", postsController.deletePost);

postsRouter.put("/:id", postsController.updatePost);

postsRouter.post("/", postsController.addPost); // new post


export default postsRouter;


// postsRouter.get("/hello", (req, res) => {
//     const name = req.query.name || "Thành"; // Lấy giá trị 'name' từ query string
//     res.json({ message: `Xin chào, ${name}!` }); // Trả về JSON với lời chào
// });

// postsRouter.get("/sum", (req, res) => {
//     const a = parseInt(req.query.a, 20) || 0; // Lấy giá trị 'a' từ query string
//     const b = parseInt(req.query.b, 10) || 0; // Lấy giá trị 'b' từ query string
//     res.json({ sum: a + b }); // Trả về tổng của 'a' và 'b'x
// });

// postsRouter.get("/new", (req, res) => {
//     const title = req.query.title || "Bài viết mới"; // Lấy giá trị 'title' từ query string
//     res.json({ message: `Tạo bài viết với tiêu đề: ${title}` }); // Trả về JSON với tiêu đề bài viết
// });
