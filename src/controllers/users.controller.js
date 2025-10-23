import jwt from "jsonwebtoken"
import User from "../models/users.models.js";

export const signUp = async (req, res) => {
    const { username, password, email, phone, role  } = req.body;

    try {
        const newUser = await User.create({ username, password, email, phone, role });
        return res.json({ message: "Đăng ký thành công" ,users: newUser});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Sai username hoặc password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, "khoa", { expiresIn: "1d" });
        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getMe = async (_rep, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
         if (!user) {
        return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }
        res.status(200).json({
            success: true,
            data: user,
        });

    }catch (err) {
        res.status(500).json({ message: "lỗi server"})
    }
}

export const getAll = async (_rep, res) => {
    try{
        const user = await User.find().select("-password")
        return res.json(user)
    } catch (err) {
      res.status(500).json({ message: "Lỗi server"});
    }
}