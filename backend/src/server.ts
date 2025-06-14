import express from 'express';
import dotenv from 'dotenv';

import { pinoHttp } from 'pino-http';

import createAdmin from './scripts/createAdmin';
import runMigrations from './scripts/migrate';
import createConnection from './config/database';
import { createRouter } from './routes/router';
import { createAdminRouter } from './routes/adminRouter';
import runSchedule from './scripts/runSchedule';
import { logger } from './config/logger';

dotenv.config();
// Need to access env variable safely

const { PORT = 5000 } = process.env;

const app = express();

// Provide correct reading of requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the same logger as middleware for logging http requests and as a standalone logger
const httpLogger = pinoHttp({
  logger: logger,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
    ],
    censor: '[REDACTED]',
  },
});
app.use(httpLogger);

const startServer = async (): Promise<void> => {
  const connection = await createConnection();

  // Executes sql commands to configure database
  await runMigrations(connection);

  await createAdmin(connection);

  const router = createRouter(connection);
  const adminRouter = createAdminRouter(connection);

  app.use('/admin/api/v1', adminRouter);
  app.use('/api/v1', router);

  // Performs scheduled backups and complete deletions
  runSchedule(connection);

  app.listen(PORT, () => {
    logger.info(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer().catch((err) => logger.info('Error during bootstrapping: ', err));
