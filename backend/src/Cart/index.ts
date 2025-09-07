import express from "express"
import { PrismaClient } from "@prisma/client"

export const cartRouter = express.Router();

cartRouter.get("/Health", (req, res) => {
    res.status(200).json({
        Message: "Cart Route Up and Running"
    });
});

cartRouter.post("/add", (req, res) => {
    const {userId, productId, quantity } = req.body;
    try{

    } catch(err){
        res.status(500).json({
            Message: "SOme thing went WWRong",
            error: err
        });
    }
});