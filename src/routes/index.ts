import express from 'express';
import userRoutes from './../handlers/UserHandler';
import productRoutes from './../handlers/ProductHandler';
import orderRoutes from './../handlers/OrderHandler';

const routes = express.Router();

routes.use(userRoutes);
routes.use(productRoutes);
routes.use(orderRoutes);

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.json({ response: 'Hello there!' });
});

export default routes;
