import express from "express";
import { authRouter } from "../auth/index.js";
import { cartRouter } from "../Cart/index.js";
import { productRouter } from "../Product/index.js";
export const mainRouter = express.Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/product", productRouter);
//# sourceMappingURL=index.js.map