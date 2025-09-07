import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../Middleware/index.js";
import { authRouter } from "../auth/index.js";
const Prisma = new PrismaClient();
export const productRouter = express.Router();
productRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Product Route UP and Running"
    });
});
productRouter.post("/add", authMiddleware, async (req, res) => {
    const { name, price, imageUrl, category } = req.body;
    try {
        const product = await Prisma.product.create({
            data: {
                name, price, imageUrl, category,
            }
        });
        res.status(201).json({
            Message: "Product added successfully",
            product
        });
    }
    catch (err) {
        res.status(500).json({
            Message: "Something went wrong",
            error: err
        });
    }
});
productRouter.get("/fetch", async (req, res) => {
    try {
        const products = await Prisma.product.findMany();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({
            Message: "Something went wrong",
            error: err
        });
    }
});
productRouter.put("/update/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, price, imageUrl, category } = req.body;
    try {
        const updatedProduct = await Prisma.product.update({
            where: { id: Number(id) },
            data: {
                name, price, imageUrl, category,
            }
        });
        res.status(200).json({
            Message: "Product Updated Successfully",
            product: updatedProduct
        });
    }
    catch (err) {
        res.status(500).json({
            Message: "Error Updating product",
            error: err
        });
    }
});
productRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await Prisma.product.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({
            Message: "Product deleted successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            Message: "Error Deleting Product",
            error: err
        });
    }
});
//# sourceMappingURL=index.js.map