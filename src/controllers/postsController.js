import { request,response } from "express";

const posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
    { id: 3, title: "Bài viết 3", content: "Nội dung bài viết 3" }
];

export const postsController = {
    getPosts: (req, res) => {
        res.json({
            message: "Danh sách bài viết",
            posts: posts
        });
    },
    getPostById: (req, res) => {
        const id = parseInt(req.params.id, 10);
        const post = posts.find(p => p.id === id);
        if (!post) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }
        res.json({
            message: "Chi tiết bài viết",
            posts: [post]
        });
    },
    addPost: (req, res) => {
        console.log(req.body);
        const { title, content } = req.body;    
        const newPost = {
            id: posts.length + 1,
            title,
            content
        };
        posts.push(newPost);
        res.status(201).json({
            message: "Bài viết đã được thêm",
            post: newPost
        });
    },
    updatePost: (req, res) => {
        const id = Number(req.params.id);
        const index = posts.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }   
        const { title, content } = req.body ?? {};
        if (typeof title !== "string" || typeof content !== "string") {
            return res.status(400).json({ message: "Thiếu title hoặc content" });
        }
        posts[index] = { id, title, content };
        res.json({ message: "Cập nhật bài viết thành công", post: posts[index] });
    },
    deletePost: (req, res) => {
        const id = parseInt(req.params.id, 10);
        const postIndex = posts.findIndex(p => p.id === id);
        if (postIndex === -1) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }
        const deletedPost = posts.splice(postIndex, 1)[0];
        res.json({ message: "Xóa bài viết thành công", deleted: deletedPost });
    },
    searchPosts: (req, res) => {
        const query = req.query.q?.toLowerCase() || "";
        const filteredPosts = posts.filter(p =>
            p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query)
        );
        res.json({
            message: `Kết quả tìm kiếm cho "${query}"`,
            posts: filteredPosts
        });
    }
};