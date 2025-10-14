import Product from "../models/productsModels";

export const productsController = {
  async getProducts(req, res) {
    try {
      const page  = Math.max(parseInt(req.query._page) || 1, 1);
      const limit = Math.max(parseInt(req.query._limit) || 10, 1);
      const skip  = (page - 1) * limit;

      // Lọc
      const filter = {};

      if (req.query.name) {
        filter.name = { $regex: String(req.query.name), $options: "i" };
      }
      // khoảng giá
      const min = req.query.minPrice ? Number(req.query.minPrice) : undefined;
      const max = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
      if (min !== undefined || max !== undefined) {
        filter.price = {};
        if (!Number.isNaN(min)) filter.price.$gte = min ?? 0;
        if (!Number.isNaN(max)) filter.price.$lte = max ?? Number.MAX_VALUE;
      }

      const sort = {};
      const sortBy = req.query.sortBy || "createdAt";
      const order  = String(req.query.order || "desc").toLowerCase() === "asc" ? 1 : -1;
      sort[sortBy] = order;

      const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter).sort(sort).skip(skip).limit(limit),
      ]);

      res.json({ message: "Danh sách sản phẩm", total, page, limit, products });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      res.json({ message: "Chi tiết sản phẩm", product });
    } catch (err) {
      res.status(400).json({ message: "ID không hợp lệ", error: err.message });
    }
  },

  /** POST /products */
  async addProduct(req, res) {
    try {
      const { name, category, price, status } = req.body ?? {};
      const priceNum = typeof price === "number" ? price : Number(price);

      if (typeof name !== "string" || !name.trim() ||
          typeof category !== "string" || !category.trim() ||
          !Number.isFinite(priceNum) || priceNum < 0) {
        return res.status(400).json({ message: "Cần name (string), category (string), price (number >= 0)" });
      }

      const product = await Product.create({
        name: name.trim(),
        category: category.trim(),
        price: priceNum,
        ...(status ? { status } : {})
      });

      res.status(201).json({ message: "Tạo sản phẩm thành công", product });
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  /** PUT /products/:id (cập nhật toàn bộ) */
  async updateProduct(req, res) {
    try {
      const { name, category, price, status } = req.body ?? {};
      const priceNum = typeof price === "number" ? price : Number(price);

      if (typeof name !== "string" || !name.trim() ||
          typeof category !== "string" || !category.trim() ||
          !Number.isFinite(priceNum) || priceNum < 0) {
        return res.status(400).json({ message: "Cần name (string), category (string), price (number >= 0)" });
      }

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        { name: name.trim(), category: category.trim(), price: priceNum, ...(status ? { status } : {}) },
        { new: true, runValidators: true }
      );

      if (!updated) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      res.json({ message: "Cập nhật sản phẩm thành công", product: updated });
    } catch (err) {
      res.status(400).json({ message: "ID không hợp lệ", error: err.message });
    }
  },

  /** PATCH /products/:id (cập nhật một phần) */
  async patchProduct(req, res) {
    try {
      const update = {};
      if (typeof req.body.name === "string")     update.name = req.body.name.trim();
      if (typeof req.body.category === "string") update.category = req.body.category.trim();
      if (typeof req.body.price !== "undefined") {
        const priceNum = typeof req.body.price === "number" ? req.body.price : Number(req.body.price);
        if (!Number.isFinite(priceNum) || priceNum < 0) {
          return res.status(400).json({ message: "price phải là số >= 0" });
        }
        update.price = priceNum;
      }
      if (typeof req.body.status === "string")   update.status = req.body.status;

      const updated = await Product.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      res.json({ message: "Cập nhật thành công", product: updated });
    } catch (err) {
      res.status(400).json({ message: "ID không hợp lệ", error: err.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      res.json({ message: "Xóa sản phẩm thành công", deleted });
    } catch (err) {
      res.status(400).json({ message: "ID không hợp lệ", error: err.message });
    }
  }
};
