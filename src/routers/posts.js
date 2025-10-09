import { Router } from "express";
import {postsController} from "../controllers/postsController.js";
import { validateAddSchema, validateUpadateSchema } from "../validation/posts.validation.js";
import { validateRequest } from "../middleware/validationRequest.js";


const postsRouter = Router();


postsRouter.get("/", postsController.getPosts);

postsRouter.get("/search", postsController.searchPosts);

postsRouter.get("/:id", postsController.getPostById);

postsRouter.delete("/:id", postsController.deletePost);

postsRouter.put("/:id", validateRequest(validateUpadateSchema), postsController.updatePost);

postsRouter.post("/", validateRequest(validateAddSchema), postsController.addPost);// new post để tạo bài viết mới và thêm vào mảng posts

// postsRouter.patch("/:id", postsController.patchPost);


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

