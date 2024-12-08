import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { Connection } from 'mysql2/promise';

const checkPassword = async (
  login: string,
  password: string,
  connection: Connection
): Promise<boolean> => {
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

// Returns admin's id
const getAdminIdFromDb = async (
  login: string,
  connection: Connection
): Promise<number> => {
  const [rows] = await connection.query<RowDataPacket[]>(
    'SELECT id FROM admins WHERE login = ?',
    [login]
  );

  if (rows.length === 0) {
    throw new Error('Admin not found');
  }

  return rows[0].id;
};

const saveRefreshTokenToDb = async (
  refreshToken: string,
  id: number,
  connection: Connection
) => {
  await connection.query(
    'INSERT INTO refresh_tokens (admin_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
    [id, refreshToken]
  );
};

export { checkPassword, getAdminIdFromDb, saveRefreshTokenToDb };
