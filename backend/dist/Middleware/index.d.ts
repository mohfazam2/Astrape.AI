import type { Request, Response, NextFunction } from "express";
interface authRequest extends Request {
    user?: {
        userId: number;
        email: string;
    };
}
export declare const authMiddleware: (req: authRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=index.d.ts.map