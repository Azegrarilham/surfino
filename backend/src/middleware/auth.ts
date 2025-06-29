import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userID?: string;
      role?: string;
    }
  }
}
const JWT_SECRET = process.env.JWT_SECRET;
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(401).json({ error: 'Authentication token is missing' });
        return;
    }
    jwt.verify(token, JWT_SECRET as string, (err, user) => {
        if (err) {
            // Token is invalid or expired
            console.error('JWT verification error:', err);
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        // If token is valid, attach user info to the request object
        // The 'user' here is the payload we put in jwt.sign({ userId, role })
        const payload = user as { userId: string; role: string };
        req.userID = payload.userId;
        req.role = payload.role;
        // Proceed to the next middleware or route handler
        next();
    });
};
