// import express from "express";
// import postsRouter from "./routers/posts";

// const app = express();
// const port = process.env.PORT || 3000;

// app.use("/api/posts", postsRouter);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


// const express = require('express');
// const app = express();

// const PORT = 3000;

// // Route mặc định
// app.get('/', (req, res) => {
//   res.send('Hello World! 🚀');
// });

// app.get('/hello', (req, res) => {
//     const name = req.query.name || 'Thành'; // Lấy giá trị 'name' từ query string
//     res.send(`Hello ${name}!`);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import postsRouter from "./routers/posts";
import productsRouter from "./routers/products.js";
import usersRouter from "./routers/users.js";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();
const app = express();

mongoose
  .connect("mongodb://localhost:27017/my_database")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use(morgan("dev")); // Sử dụng morgan để log các request
app.use(express.json()); // Middleware để phân tích JSON trong body của request
app.use(express.urlencoded({ extended: true })); // Middleware để phân tích URL-encoded data

app.use("/posts", postsRouter); // Định nghĩa route chính bắt đầu bằng /api
app.use("/products", productsRouter); // Định nghĩa route cho sản phẩm
app.use("/users", usersRouter); // Định nghĩa route cho người dùng
app.use("/author", usersRouter); // Định nghĩa route cho tác giả

app.use("/", (req, res) => {
    res.json({
        message: "Welcome to my API",
        endpoints: {
            posts: "/posts",
            users: "/users",
            products: "/products",
            author: "/author"
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});