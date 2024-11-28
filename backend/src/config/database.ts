import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Need to access env variable safely
dotenv.config();

export default async function createConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}
