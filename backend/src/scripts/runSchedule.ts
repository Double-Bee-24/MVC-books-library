import { exec } from 'child_process';

import dotenv from 'dotenv';
import type { Connection } from 'mysql2/promise';
import cron from 'node-cron';

import { logger } from '../config/logger';

const BACKUP_DIR = './backups';

dotenv.config();

// Performs scheduled backups and complete deletions (by removing self-deleted data)
const runSchedule = (connection: Connection): void => {
  makeBackup();

  performSoftDeletion(connection);
};

const makeBackup = (): void => {
  cron.schedule('0 20 * * *', async () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `${BACKUP_DIR}/${process.env.DB_NAME}_backup_${timestamp}.sql`;

    // Create directory for backups
    exec(`mkdir -p ${BACKUP_DIR}`, err => {
      if (err) {
        logger.error({ message: 'Backup directory creating error: ', err });
        return;
      }

      // Use MYSQL_PWD to securely pass the password
      exec(
        `MYSQL_PWD="${process.env.DB_PASSWORD}" mysqldump -u ${process.env.DB_USER} ${process.env.DB_NAME} > ${backupFile}`,
        err => {
          if (err) {
            logger.error({ message: 'Backup creating error: ', err });
          } else {
            logger.info(`Backup created successfully: ${backupFile}`);
          }
        }
      );
    });
  });
};

const performSoftDeletion = (connection: Connection): void => {
  cron.schedule('0 19 * * *', async () => {
    try {
      await connection.execute(`
        DELETE FROM book_authors
        WHERE book_id IN (
          SELECT id
          FROM books
          WHERE is_deleted = TRUE
            AND updated_at <= NOW() - INTERVAL 24 HOUR
        );
      `);

      await connection.execute(`
        DELETE FROM books
        WHERE is_deleted = TRUE
          AND updated_at <= NOW() - INTERVAL 24 HOUR;
      `);

      logger.info('Deleted books removed from db successfully');
    } catch (err) {
      logger.error({ message: 'Error during deletion', err });
    }
  });
};

export default runSchedule;
