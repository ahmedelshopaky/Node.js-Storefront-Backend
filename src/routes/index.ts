import express from 'express';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.json({ response: 'Hello there!' });
});

export default routes;
