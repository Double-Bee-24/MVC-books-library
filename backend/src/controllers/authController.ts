import jwt from 'jsonwebtoken';
import createConnection from '../config/database';
import { Request, Response } from 'express';
import { checkPassword } from '../models/AuthModel';
import dotenv from 'dotenv';
import TypedRequestBody from '../interfaces/TypedRequestBody';
import ILoginBody from '../interfaces/ILoginBody';

// Login admin to website
const login = async (req: TypedRequestBody<ILoginBody>, res: Response) => {
  const connection = await createConnection();
  dotenv.config();

  try {
    const { login, password } = req.body;

    const isPasswordValid = await checkPassword(login, password);

    console.log(isPasswordValid, 'ispasswordvalid');

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const payload = { login };
    const secretKey = process.env.JWT_SECRET || 'default key';

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error while logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Break the connection
const logout = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error('Error while logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { login, logout };
