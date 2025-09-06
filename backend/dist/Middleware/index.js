import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            Message: "Access Denied. No Token PRovided."
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({
            Message: "Invalid or expired token"
        });
    }
};
//# sourceMappingURL=index.js.map