import express from "express";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export const authRouter = express.Router();

authRouter.get("/Health", (req, res) => {
    res.status(200).json({
        Msg: "Auth Route Up and Running"
    });
});


authRouter.post("/signUp", async (req, res) => {
        const {name, email, password} = req.body;
        try{
            const existingUser = await Prisma.user.findUnique({
                where: {email},
            });

            if(existingUser){
                return res.status(400).json({
                    Message: "Email already Registered"
                });
            }
            const User = await Prisma.user.create({
            data:{
                name: name,
                email: email,
                password: password
            }
        });

         return res.status(200).json({
            Message: "Sign Up SuccessFull",
            User
        });

        } catch(err){
            return res.status(500).json({
                Msg: "Something Went Wrong",
                error: err
            });
        }
    });