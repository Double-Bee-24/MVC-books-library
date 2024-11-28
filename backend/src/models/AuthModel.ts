import createConnection from '../config/database';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

const checkPassword = async (login: string, password: string) => {
  const connection = await createConnection();

  const [rows] = await connection.query<RowDataPacket[]>(
    'SELECT * FROM admins WHERE login = ?',
    [login]
  );

  const adminData = rows[0];

  // If we didn't find entry with received login
  if (!adminData) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, adminData.password);

  return isPasswordValid;
};

export { checkPassword };
