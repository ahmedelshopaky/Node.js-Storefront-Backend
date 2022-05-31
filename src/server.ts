import express, { NextFunction, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/UserHandler';
import productRoutes from './handlers/ProductHandler';
import orderRoutes from './handlers/OrderHandler';
import categoryRoutes from './handlers/CategoryHandler';

const app = express();
const HOST = 'localhost';
const PORT = process.env.PORT as unknown as number;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: express.Request, res: express.Response): void => {
  res.json({ response: 'Hello there!' });
});

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(categoryRoutes);

// Not Found MW
app.use((req: express.Request, res: express.Response): void => {
  res.status(404).json({ respone: 'Not Found' });
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

app.listen(PORT, HOST, () => {
  console.log(`starting app on: ${HOST}:${PORT}`);
});

export default app;
