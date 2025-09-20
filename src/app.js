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
import postRouter from "./routers/posts";

dotenv.config();
const app = express();

app.use("/api/posts", postRouter); // Định nghĩa route chính bắt đầu bằng /api

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});