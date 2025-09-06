import  express  from "express";
import {authRouter} from "../auth/index.js"

export const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);