import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import type { Connection, RowDataPacket } from 'mysql2/promise';

import { logger } from '#config/logger';

// Creates anadmin in db with authorization data from .env
const createAdmin = async (connection: Connection): Promise<void> => {
  dotenv.config();
  try {
    if (!process.env.ADMIN_LOGIN || !process.env.ADMIN_PASSWORD) {
      throw new Error(
        'ADMIN_LOGIN and ADMIN_PASSWORD must be included in .env file'
      );
    }

    const checkQuery = 'SELECT COUNT(*) AS count FROM admins WHERE login = ?';
    const [rows] = await connection.execute<RowDataPacket[]>(checkQuery, [
      process.env.ADMIN_LOGIN,
    ]);

    const adminExists = rows[0]?.count > 0;

    // Creates once admin's data and inserts it to db
    if (adminExists) {
      return;
    }

    const insertQuery = `
      INSERT INTO admins (login, password)
      VALUES (?, ?);
    `;

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await connection.execute(insertQuery, [
      process.env.ADMIN_LOGIN,
      hashedPassword,
    ]);
  } catch (err) {
    logger.error({ message: 'Error while creating admin: ', err });
  }
};

export default createAdmin;
