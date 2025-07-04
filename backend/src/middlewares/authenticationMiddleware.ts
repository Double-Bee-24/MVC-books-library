import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { logger } from '../config/logger';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: { id: number; role: string; login: string };
//     }
//   }
// }

// Check jwt token relevancy before admin's actions
const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ error: 'Access denied, no token provided' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'Access denied, token missing' });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'default_secret';

    // Check a token
    const decoded: string | JwtPayload = jwt.verify(token, secretKey);

    if (typeof decoded === 'string' || decoded.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    next();
  } catch (error) {
    logger.error('Invalid token:', error);
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
};

export default authenticationMiddleware;
