import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import {
  checkPassword,
  getAdminIdFromDb,
  saveRefreshTokenToDb,
} from '../models/AuthModel';
import dotenv from 'dotenv';
import TypedRequestBody from '../interfaces/TypedRequestBody';
import ILoginBody from '../interfaces/ILoginBody';
import IRefresshToken from '../interfaces/IRefreshToken';

// Login admin to website
const login = async (req: TypedRequestBody<ILoginBody>, res: Response) => {
  dotenv.config();

  try {
    const { login, password } = req.body;

    const isPasswordValid = await checkPassword(login, password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const adminId = await getAdminIdFromDb(login);

    const payload = { login };
    const secretKey = process.env.JWT_SECRET || 'default key';
    const refreshSecretKey =
      process.env.REFRESH_SECRET || 'default_refresh_key';

    const accessToken = jwt.sign(payload, secretKey, { expiresIn: '3m' });
    const refreshToken = jwt.sign(payload, refreshSecretKey, {
      expiresIn: '7d',
    });

    await saveRefreshTokenToDb(refreshToken, adminId);

    res.status(200).json({
      message: 'Login successful',
      refreshToken,
      accessToken,
    });
  } catch (error) {
    console.error('Error while logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateToken = async (
  req: TypedRequestBody<IRefresshToken>,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: 'No refresh token provided' });
      return;
    }

    const refreshSecretKey =
      process.env.REFRESH_SECRET || 'default_refresh_key';

    // Перевіряємо refresh token
    const decoded = jwt.verify(refreshToken, refreshSecretKey) as {
      login: string;
    };

    // Create new tokens
    const accessToken = jwt.sign(
      { login: decoded.login },
      process.env.JWT_SECRET || 'default key',
      { expiresIn: '3m' }
    );
    const newRefreshToken = jwt.sign(
      { login: decoded.login },
      refreshSecretKey,
      { expiresIn: '7d' }
    );

    // Refresh token in db
    const adminId = await getAdminIdFromDb(decoded.login);
    await saveRefreshTokenToDb(newRefreshToken, adminId);

    res.status(200).json({
      message: 'Tokens updated successfully',
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Error during token update: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout admin from the website
const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(400).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      res.status(400).json({ error: 'Token is missing' });
      return;
    }

    const refreshSecretKey =
      process.env.REFRESH_SECRET || 'default_refresh_key';

    const decoded = jwt.verify(token, refreshSecretKey) as { login: string };

    // Deletes refresh token from db
    const adminId = await getAdminIdFromDb(decoded.login);
    await saveRefreshTokenToDb('', adminId);

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error while logging out: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { login, logout, updateToken };
