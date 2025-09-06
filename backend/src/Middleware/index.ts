import type { Request, Response, NextFunction, }  from "express";
import jwt from "jsonwebtoken"

interface authRequest extends Request{
    user?: {
        userId: number;
        email: string;
    };
}

export const authMiddleware = (req: authRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            Message: "Access Denied. No Token PRovided."
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, email: string};
        req.user = decoded;

        next();
    } catch(err){
        return res.status(403).json({
            Message: "Invalid or expired token"
        });
    }
}