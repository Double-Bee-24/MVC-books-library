import express from 'express';
import dotenv from 'dotenv';

import createAdmin from './scripts/createAdmin';
import runMigrations from './scripts/migrate';
import createConnection from './config/database';
import { createRouter } from './routes/router';
import { createAdminRouter } from './routes/adminRouter';
import runSchedule from './scripts/runSchedule';

// Need to access env variable safely
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Provide correct reading of requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer().catch((err) => console.log('Error during bootstrapping: ', err));
