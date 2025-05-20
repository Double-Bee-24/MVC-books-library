import express from 'express';
import dotenv from 'dotenv';

import { pinoHttp } from 'pino-http';

import createAdmin from './scripts/createAdmin';
import runMigrations from './scripts/migrate';
import createConnection from './config/database';
import { createRouter } from './routes/router';
import { createAdminRouter } from './routes/adminRouter';
import runSchedule from './scripts/runSchedule';
import { getDevLogger, getLogflareLogger } from './config/getLogger';

// Need to access env variable safely
dotenv.config();

const { NODE_ENV = 'dev', PORT = 5000 } = process.env;

const app = express();

// Provide correct reading of requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = NODE_ENV === 'prod' ? getLogflareLogger() : getDevLogger();

// Use the same logger as middleware for logging http requests and as a standalone logger
const httpLogger = pinoHttp({
  logger: logger,
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
