import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';
import {
  checkPassword,
  getAdminIdFromDb,
  saveRefreshTokenToDb,
} from '../models/AuthModel';
import dotenv from 'dotenv';
import TypedRequestBody from '../interfaces/TypedRequestBody';
import ILoginBody from '../interfaces/ILoginBody';
import IRefresshToken from '../interfaces/IRefreshToken';
import { Connection } from 'mysql2/promise';
import { logger } from '../config/logger';

// Login admin to website
const login = async (
  req: TypedRequestBody<ILoginBody>,
  res: Response,
  connection: Connection
) => {
  dotenv.config();

  try {
    const { login, password } = req.body;

    const isPasswordValid = await checkPassword(login, password, connection);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const adminId = await getAdminIdFromDb(login, connection);

    const payload = { login, role: 'admin' };
    const secretKey = process.env.JWT_SECRET || 'default key';
    const refreshSecretKey =
      process.env.REFRESH_SECRET || 'default_refresh_key';

    const accessToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, refreshSecretKey, {
      expiresIn: '7d',
    });

    await saveRefreshTokenToDb(refreshToken, adminId, connection);

    res.status(200).json({
      message: 'Login successful',
      refreshToken,
      accessToken,
    });
  } catch (error) {
    logger.error('Error while logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateToken = async (
  req: TypedRequestBody<IRefresshToken>,
  res: Response,
  connection: Connection
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: 'No refresh token provided' });
      return;
    }

    const refreshSecretKey =
      process.env.REFRESH_SECRET || 'default_refresh_key';

    // Сheck refresh token
    const decoded: JwtPayload | string = jwt.verify(
      refreshToken,
      refreshSecretKey
    );

    if (typeof decoded === 'string') {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }

    if (typeof decoded.login !== 'string' || typeof decoded.role !== 'string') {
      res.status(401).json({ error: 'Invalid refresh token payload' });
      return;
    }

    const { login, role } = decoded;
    // Create new tokens
    const accessToken = jwt.sign(
      { login, role },
      process.env.JWT_SECRET || 'default key',
      { expiresIn: '3m' }
    );
    const newRefreshToken = jwt.sign({ login, role }, refreshSecretKey, {
      expiresIn: '7d',
    });

    // Refresh token in db
    const adminId = await getAdminIdFromDb(decoded.login, connection);
    await saveRefreshTokenToDb(newRefreshToken, adminId, connection);

    res.status(200).json({
      message: 'Tokens updated successfully',
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    logger.error('Error during token update: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { login, updateToken };
