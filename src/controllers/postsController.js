// src/controllers/posts.controller.js
import { Request, Response } from "express";
import Post from "../models/postsModels.js";

export const postsController = {
  // GET /posts?_page=1&_limit=10&q=abc&sortBy=createdAt&order=desc
  async getPosts(req, res) {
    try {
      const page  = Math.max(parseInt(req.query._page) || 1, 1);
      const limit = Math.max(parseInt(req.query._limit) || 10, 1);
      const skip  = (page - 1) * limit;

      const filter = {};
      if (req.query.q) {
        filter.title = { $regex: String(req.query.q), $options: "i" }; // không phân biệt hoa thường
      }

      const sort = {};
      const sortBy = (req.query.sortBy) || "createdAt";
      const order  = String(req.query.order).toLowerCase() === "asc" ? 1 : -1;
      sort[sortBy] = order;

      const [total, posts] = await Promise.all([
        Post.countDocuments(filter),
        Post.find(filter).sort(sort).skip(skip).limit(limit)
      ]);

      res.json({ message: "Danh sách bài viết", total, page, limit, posts });
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  // GET /posts/:id  (tự tăng viewCount +1 mỗi lần xem)
  async getPostById(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { viewCount: 1 } },
        { new: true }
      );
      if (!post) return res.status(404).json({ message: "Bài viết không tồn tại" });
      res.json({ message: "Chi tiết bài viết", post });
    } catch (err) {
      res.status(400).json({ message: "ID không hợp lệ", error: err.message });
    }
  },

  // POST /posts
  async addPost(req, res) {
    try {
      const { title, content, isPublished } = req.body ?? {};
      if (typeof title !== "string" || typeof content !== "string") {
        return res.status(400).json({ message: "Thiếu hoặc sai 'title' / 'content' (string)" });
      }
      const post = await Post.create({
        title: title.trim(),
        content: content.trim(),
        isPublished: Boolean(isPublished)
      });
      res.status(201).json({ message: "Tạo bài viết thành công", post });
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  // PUT /posts/:id (cập nhật toàn bộ)
  async updatePost(req, res) {
    try {
      const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) return res.status(404).json({ message: "Bài viết không tồn tại" });
      res.json({ message: "Cập nhật bài viết thành công", post: updated });
    } catch (err) {
      res.status(400).json({ message: "ID không hợp lệ", error: err.message });
    }
  },

  // DELETE /posts/:id
  async deletePost(req, res) {
    try {
      const deleted = await Post.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Bài viết không tồn tại" });
      res.json({ message: "Xóa bài viết thành công", deleted });
    } catch (err) {
      res.status(400).json({ message: "ID không hợp lệ", error: err.message });
    }
  },

  // (Tuỳ chọn) GET /posts/search?q=...
  async searchPosts(req, res) {
    try {
      const q = String(req.query.q || "");
      if (!q) return res.status(400).json({ message: "Vui lòng truyền ?q=" });
      const posts = await Post.find({ title: { $regex: q, $options: "i" } });
      res.json({ message: `Kết quả tìm kiếm cho "${q}"`, posts });
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }
};
