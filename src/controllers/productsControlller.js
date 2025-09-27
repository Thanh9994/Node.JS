import { request, response } from "express";

let products = [
    { id: 1, name: "Sản phẩm 1", category: "Điện tử", price: 100 },
    { id: 2, name: "Sản phẩm 2", category: "Thời trang", price: 200 },
    { id: 3, name: "Sản phẩm 3", category: "Gia dụng", price: 300 },
    { id: 4, name: "Sản phẩm 4", category: "Điện tử", price: 150 },
    { id: 5, name: "Sản phẩm 5", category: "Thời trang", price: 250 },
    { id: 6, name: "Sản phẩm 6", category: "Gia dụng", price: 350 }
];

export const productsController = {
    getProducts: (req, res) => {
        res.json({
            message: "Danh sách sản phẩm",
            products: products
        });
    },
    getProductById: (req, res) => {
        const id = parseInt(req.params.id, 10);
        const product = products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        res.json({
            message: "Chi tiết sản phẩm",
            products: [product]
        });
    },
    addProduct: (req, res) => {
        console.log(req.body);
        const { name, category, price } = req.body;
        const newProduct = {
            id: products.length + 1,
            name,
            category,
            price
        };
        products.push(newProduct);
        res.status(201).json({
            message: "Sản phẩm đã được thêm",
            product: newProduct
        });
    },
    updateProduct: (req, res) => {
        const id = Number(req.params.id);
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        const { name, category, price } = req.body ?? {};
        if (typeof name !== "string" || typeof category !== "string" || typeof price !== "number") {
            return res.status(400).json({ message: "Thiếu name, category hoặc price" });
        }
        products[index] = { id, name, category, price };
        res.json({ message: "Cập nhật sản phẩm thành công", product: products[index] });
    },
    deleteProduct: (req, res) => {
        const id = parseInt(req.params.id, 10);
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        const deletedProduct = products.splice(productIndex, 1)[0];
        res.json({ message: "Xóa sản phẩm thành công", deleted: deletedProduct });
    }
};