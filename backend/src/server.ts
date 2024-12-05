import express from 'express';
import createAdmin from './scripts/createAdmin';
import bodyParser from 'body-parser';
import runMigrations from './migrate';
import dotenv from 'dotenv';
import createConnection from './config/database';
import { router } from './routes/router';
import { adminRouter } from './routes/adminRouter';

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

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
})();

app.use('/admin/api/v1', adminRouter);
app.use('/api/v1', router);
