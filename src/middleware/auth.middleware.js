import jwt from "jsonwebtoken";
import User from "../models/users.models"

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "khoa");

        // Lấy user từ DB và bỏ mật khẩu (ẩn)
        const currentUser = await User.findById(decoded.id).select("-password");

        if (!currentUser) {
            return res.status(401).json({ message: "Người dùng không tồn tại." });
        }

        // Gắn user vào request để controller có thể dùng
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
    }
};

export const adminMiddleware = (req, res, next) => {
  if(req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};  
