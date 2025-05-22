import * as fs from 'node:fs/promises';
import path from 'path';
import { Connection } from 'mysql2/promise';
import { logger } from '../config/logger';

const migrationsPath = path.join(__dirname, '../../migrations');

export default async function runMigrations(connection: Connection) {
  try {
    // Get all files from "./migrations"
    const files = await fs.readdir(migrationsPath);

    const filteredFiles = files.filter((file) => file.endsWith('.sql'));

    if (filteredFiles.length === 0) {
      logger.info('No migration files found.');
      return;
    }

    // Make sure that there is `migrations` table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration_name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get already existing migrations list
    const [executedMigrations]: any = await connection.query(
      'SELECT migration_name FROM migrations;'
    );
    const executedNames = executedMigrations.map(
      (row: any) => row.migration_name
    );

    for (const file of filteredFiles) {
      if (executedNames.includes(file)) {
        continue;
      }

      const filePath = path.join(migrationsPath, file);

      const sql = await fs.readFile(filePath, 'utf-8');

      logger.info(`Executing migration: ${file}`);

      await connection.query(sql);

      await connection.query(
        'INSERT INTO migrations (migration_name) VALUES (?);',
        [file]
      );
    }
  } catch (error) {
    logger.error('Error executing migrations:', error);
  }
}
