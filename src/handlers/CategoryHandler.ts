import express from 'express';
import { Category, CategoryType } from '../models/Category';
import { authenticate } from './UserHandler';

const categoryInstance = new Category();
const categoryRoutes = express.Router();

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const category: CategoryType = { name: req.body.name };
    const newCategory = await categoryInstance.create(category);
    res.json({ category: newCategory });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

categoryRoutes.post('/categories', authenticate, create);

export default categoryRoutes;
