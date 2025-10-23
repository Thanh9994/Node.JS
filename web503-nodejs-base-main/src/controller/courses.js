import Courses from "../models/courses.model";
import User from "../models/user.model"
import jwt from "jsonwebtoken"

export const CoursesContrller = {
    async signup (req, res) {
    const {email, password, role } = req.bpdy;
        try{
            const user = await User.create({email, password, role})
            return res.json({ message: "đăng ký thành công ", data: user})
        }catch (err){
            return res.status(400).json({ err })
        }
    },
    async login (req, res) {
        const {email, password } = req.bpdy;
        try{
            const user = await User.findOne({ email }).select("+password");
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ message: "Sai eamil hoặc password" });
            }
            const token = jwt.sign({id: user._id, role: user.role}, "khoa", {expiresIn:"1d"})
            return res.status(200).json({ user, token });
        }catch (err){
            return res.status(500).json(err)
        }
    },
    async getAll (_req, res) {
        try{
            const Courses = await Courses.find()
            return res.json(Courses);
        }catch (err){
            return res.status(404).json({message: "lỗi không tải danh sách", err})
        }
    },
    async create (req, res) {
       try {
            const course = await Course.create(req.body);
            res.json(course);
        } catch (error) {
            res.json(error.message);
        }
    },
    async update (req, res) {
        try {
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            });
            if (!course) {
            return res.json("Khong tim thay");
            }
            res.json(course);
        } catch (error) {
            res.json(error.message);
        }
    },
    async delete (req, res) {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) {
            return res.json("Khong tim thay");
            }
            res.json("xoa thanh cong");
        } catch (error) {
            res.json(error.message);
        }
    }
} 
