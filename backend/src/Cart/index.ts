import type { Request, Response, NextFunction } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../Middleware/index.js";

const Prisma = new PrismaClient();

export const cartRouter = express.Router();
interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

cartRouter.get("/Health", (req, res) => {
  res.status(200).json({
    Message: "Cart Route Up and Running",
  });
});

// cartRouter.post("/add",authMiddleware, async (req: AuthRequest, res: Response) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user?.userId;

//     if (!userId) {
//       return res.status(401).json({
//         Message: "User not authenticated",
//       });
//     }

//     try {
//       let cart = await Prisma.cart.findUnique({
//         where: { userId },
//       });

//       if (!cart) {
//         cart = await Prisma.cart.create({
//           data: { userId },
//         });
//       }

//       let cartItem = await Prisma.cartItem.findFirst({
//         where: { cartId: cart.id, productId },
//       });

//       if (cartItem) {
//         cartItem = await Prisma.cartItem.update({
//           where: { id: cartItem?.id },
//           data: {
//             quantity: cartItem?.quantity + (quantity || 1),
//           },
//         });
//       } else{
//         cartItem = await Prisma.cartItem.create({
//             data:{
//                 cartId: cart.id,
//                 productId,
//                 quantity: quantity || 1
//             }
//         });
//       }

//       res.status(200).json({
//         Message: "Product added to cart",
//         cartItem
//       });
//     } catch (err) {
//       res.status(500).json({
//         Message: "SOme thing went WWRong",
//         error: err,
//       });
//     }
//   }
// );


cartRouter.post("/update", authMiddleware, async (req: AuthRequest, res: Response) => {
    const { productId, quantityChange } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ Message: "User not authenticated" });

    try {
       
        let cart = await Prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await Prisma.cart.create({ data: { userId } });
        }

        
        let cartItem = await Prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });

        
        if (!cartItem && quantityChange > 0) {
            cartItem = await Prisma.cartItem.create({
                data: { cartId: cart.id, productId, quantity: quantityChange }
            });

        
        } else if (cartItem) {
            const newQuantity = cartItem.quantity + quantityChange;

            
            if (newQuantity <= 0) {
                await Prisma.cartItem.delete({ where: { id: cartItem.id } });
                return res.status(200).json({ Message: "Item removed from cart" });
            } else {
                cartItem = await Prisma.cartItem.update({
                    where: { id: cartItem.id },
                    data: { quantity: newQuantity }
                });
            }

        } else {
            return res.status(400).json({ Message: "Cannot decrease non-existing item" });
        }

        res.status(200).json({ Message: "Cart updated successfully", cartItem });
    } catch (err) {
        res.status(500).json({ Message: "Something went wrong", error: err });
    }
});


cartRouter.get("/list", authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ Message: "User not authenticated" });

    try {
        const cart = await Prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!cart) return res.status(200).json({ Message: "Cart is empty", items: [] });

        res.status(200).json({
            Message: "Cart fetched successfully",
            cart
        });
    } catch (err) {
        res.status(500).json({ Message: "Something went wrong", error: err });
    }
});
