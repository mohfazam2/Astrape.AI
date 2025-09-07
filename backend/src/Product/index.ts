import express from "express"
import { PrismaClient } from "@prisma/client"
import { authMiddleware } from "../Middleware/index.js";

const Prisma = new PrismaClient();


export const productRouter = express.Router();

productRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Product Route UP and Running"
    });
});

productRouter.post("/add", authMiddleware, async (req, res) => {
    const {name, price, imageUrl, category } = req.body;

    try{
        const product = await Prisma.product.create({
            data:{
                name, price, imageUrl, category,  
            }
        });

        res.status(201).json({
            Message: "Product added successfully",
            product
        });
    } catch(err){
        res.status(500).json({
            Message: "Something went wrong",
            error: err
        });
    }
});


productRouter.get("/fetch", authMiddleware, async (req, res) => {
    try{
        const products = await Prisma.product.findMany();

        res.status(200).json(products);
    } catch(err){
        res.status(500).json({
            Message: "Something went wrong",
            error: err
        });
    }
});

