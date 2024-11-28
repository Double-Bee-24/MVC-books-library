import express, { Request, Response } from 'express';
import './scripts/createAdmin';
import bodyParser from 'body-parser';
import runMigrations from './migrate';
import dotenv from 'dotenv';
import { router } from './routes/router';

// Need to access env variable safely
dotenv.config();

// Execute sql commands to configure database
runMigrations();

const app = express();

// Provide correct reading of requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
