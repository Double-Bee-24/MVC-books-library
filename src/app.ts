import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import connection from './config/database';

const app = express();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.query('SELECT * FROM users');

app.get('/bookspage', (req, res) => {
  res.sendFile('public/books-page/book-page.html', { root: __dirname });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
