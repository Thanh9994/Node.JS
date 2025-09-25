import  { Router } from "express";

const productsRouter = Router();

let products = [
    { id: 1, name: "Sản phẩm 1", price: 100 },
    { id: 2, name: "Sản phẩm 2", price: 200 },
    { id: 3, name: "Sản phẩm 3", price: 300 }
];


productsRouter.get("/", (req, res) => {
    res.json({
        message: "Danh sách sản phẩm",
        products: products
    });
});

productsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        res.json({ product, message: "Chi tiết sản phẩm" });
    } else {
        res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
});

productsRouter.post("/", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: "Thiếu tên hoặc giá sản phẩm" });
    }
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json({ message: "Tạo sản phẩm thành công", product: newProduct });
});



export default productsRouter;
