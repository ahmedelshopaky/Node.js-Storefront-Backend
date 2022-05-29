import express, { NextFunction, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();
const HOST = 'localhost';
const PORT = (process.env.PORT as unknown as number) || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
    err: ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ): void => {
    console.error(err);
    res.status(500).send('Something broke!');
  }
);

export default app;
