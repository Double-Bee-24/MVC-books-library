import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string; login: string };
    }
  }
}

interface DecodedToken extends JwtPayload {
  id: number;
  role: string;
  login: string;
}

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader, 'req.headers');

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

    // Check a token and infer it like DecodedToken
    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    req.user = decoded;

    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
};

export default authenticationMiddleware;
