import { config } from 'dotenv';
config();
import express, { Application, Request, Response } from 'express';

const app: Application = express();

const PORT: Number = Number(process.env.PORT) || 2500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(require('cors')());

import db from './databases/starwars';

db.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connection has been established successfully.
App is listening on port ${PORT}...
http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

import brouter from './routes/base';
import mrouter from './routes/movie';
import corouter from './routes/comment';
import chrouter from './routes/character';

app.use(brouter);
app.use(mrouter);
app.use(corouter);
app.use(chrouter);

// 404 Error Handler
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    error: 'And Just Like That, You Completely Lost Your Way 😥',
  });
});
