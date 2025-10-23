// import express from "express";
// import mongoose from "mongoose";

// const app = express();

// app.use(express.json());

// mongoose
//   .connect("mongodb://localhost:27017/kiemtra_nodejs_fa25")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Could not connect to MongoDB:", err));

// app.listen(3000, () => {
//   console.log(`Server is running on port http://localhost:3000`);
// });
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CoursesRouter from "./router/courses.route";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/kiemtra_nodejs_fa25")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Model Course

// const courseSchema = new mongoose.Schema(
//   {
//     courseName: String,
//     views: Number,
//     thumbnail: String,
//     note: String,
//     category: String,
//   },
//   {
//     timestamps: true,
//   }
// );
// const Course = new mongoose.model("Course", courseSchema);

// // Routes
// app.get("/courses", async function (_req, res) {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.json(error.message);
//   }
// });
// app.post("/courses", async function (req, res) {
//   try {
//     const course = await Course.create(req.body);
//     res.json(course);
//   } catch (error) {
//     res.json(error.message);
//   }
// });
// app.get("/courses/:id", async function (req, res) {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) {
//       return res.json("Khong tim thay");
//     }
//     res.json(course);
//   } catch (error) {
//     res.json(error.message);
//   }
// });
// app.put("/courses/:id", async function (req, res) {
//   try {
//     const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!course) {
//       return res.json("Khong tim thay");
//     }
//     res.json(course);
//   } catch (error) {
//     res.json(error.message);
//   }
// });
// app.delete("/courses/:id", async function (req, res) {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);
//     if (!course) {
//       return res.json("Khong tim thay");
//     }
//     res.json("xoa thanh cong");
//   } catch (error) {
//     res.json(error.message);
//   }
// });

// // Auth
// // Model User
// const userSchema = new mongoose.Schema(
//   {
//     email: String,
//     password: String,
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const User = new mongoose.model("User", userSchema);

// app.post("/auth/register", async function (req, res) {
//   try {
//     // check email ton tai khong
//     const userExisted = await User.findOne({ email: req.body.email });
//     if (userExisted) {
//       return res.json("Da ton tai email");
//     }
//     // hashPassword
//     const hashPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({
//       email: req.body.email,
//       password: hashPassword,
//     });
//     res.json(user);
//   } catch (error) {
//     res.json(error.message);
//   }
// });
// app.post("/auth/login", async function (req, res) {
//   try {
//     // check user ton tai
//     const userExisted = await User.findOne({ email: req.body.email });
//     if (!userExisted) {
//       return res.json("Khong ton tai email nay");
//     }
//     // check password co khop khong
//     const isMatch = await bcrypt.compare(
//       req.body.password,
//       userExisted.password
//     );
//     if (!isMatch) {
//       return res.json("Khong khong khop password");
//     }
//     // token
//     const token = jwt.sign({ id: userExisted._id }, "khoa-bi-mat", {
//       expiresIn: "1d",
//     });
//     res.json({
//       message: "Login success",
//       token,
//     });
//   } catch (error) {
//     res.json(error.message);
//   }
// });

app.use("/", CoursesRouter)
// Route: auth/register, auth/login
app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});