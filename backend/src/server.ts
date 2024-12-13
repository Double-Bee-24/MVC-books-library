import express from 'express';
import createAdmin from './scripts/createAdmin';
import bodyParser from 'body-parser';
import runMigrations from './scripts/migrate';
import dotenv from 'dotenv';
import createConnection from './config/database';
import { createRouter } from './routes/router';
import { createAdminRouter } from './routes/adminRouter';
import runSchedule from './scripts/runSchedule';

// Need to access env variable safely
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Provide correct reading of requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async (): Promise<void> => {
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
})();
