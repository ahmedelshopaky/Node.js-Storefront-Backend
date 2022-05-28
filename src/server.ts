import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();
const HOST = 'localhost';
const PORT = 8080;

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, HOST, () => {
  console.log(`starting app on: ${HOST}:${PORT}`);
});

// Not Found MW
app.use((req: express.Request, res: express.Response): void => {
  res.status(404).json({ response: '404 NOT FOUND' });
});

// Error MW
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: Function
  ): void => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
);

export default app;
