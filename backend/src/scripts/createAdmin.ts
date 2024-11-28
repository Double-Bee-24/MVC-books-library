import dotenv from 'dotenv';
import createConnection from '../config/database';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

(async () => {
  dotenv.config();
  try {
    const connection = await createConnection();

    if (!process.env.ADMIN_LOGIN || !process.env.ADMIN_PASSWORD) {
      throw new Error(
        'ADMIN_LOGIN та ADMIN_PASSWORD must be included in .env file'
      );
    }

    const checkQuery = `SELECT COUNT(*) AS count FROM admins WHERE login = ?`;
    const [rows] = await connection.execute<RowDataPacket[]>(checkQuery, [
      process.env.ADMIN_LOGIN,
    ]);

    const adminExists = rows[0]?.count > 0;

    // Creates once admin's data and inserts it to db
    if (adminExists) {
      console.log(
        'There is an admin with such login already. Nothing has happaned/'
      );
    } else {
      const insertQuery = `
        INSERT INTO admins (login, password)
        VALUES (?, ?);
      `;

      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await connection.execute(insertQuery, [
        process.env.ADMIN_LOGIN,
        hashedPassword,
      ]);

      console.log('Admin created!');
    }

    await connection.end();
  } catch (error) {
    console.error('Error while creating admin: ', error);
  }
})();
