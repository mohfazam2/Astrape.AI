import express from "express";
export const authRouter = express.Router();
authRouter.get("/Health", (req, res) => {
    res.status(200).json({
        Msg: "Auth Route Up and Running"
    });
});
//# sourceMappingURL=index.js.map