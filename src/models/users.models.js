import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: [true, "Vui lòng nhập tên người dùng"],
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: [true,"Vùi lòng nhập email"],
        unique: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        select: false
    },
    password: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu"],
        minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    },
    { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
export default User;