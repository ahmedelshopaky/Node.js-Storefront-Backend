import express from 'express';
import { authenticate } from './UserHandler';
import { Product, ProductType } from '../models/Product';

const productInstance = new Product();
const productRoutes = express.Router();

const index = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const products = await productInstance.index();
    res.json({ products });
  } catch (err) {
    res.status(404).json({ response: 'Not Found' });
  }
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const product = await productInstance.show(id);
    res.json({ product });
  } catch (err) {
    res.status(404).json({ response: 'Not Found' });
  }
};

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const newProduct: ProductType = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
      // rate: req.body.rate,
    };
    const product = await productInstance.create(newProduct);
    res.json({ product });
  } catch (err) {
    res.status(404).json({ response: 'Not Found' });
  }
};

const getTopFiveProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const products = await productInstance.getTopFiveProducts();
    res.json({ products });
  } catch (err) {
    res.status(404).json({ response: 'Not Found' });
  }
};

const getProductByCategory = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const category_id = req.params.id as unknown as number;
    const products = await productInstance.getProductByCategory(category_id);
    res.json({ products });
  } catch (err) {
    res.status(404).json({ response: 'Not Found' });
  }
};

productRoutes.get('/products', index);
productRoutes.get('/products/top-five', getTopFiveProducts);
productRoutes.get('/products/:id', show);
productRoutes.post('/products', authenticate, create);
productRoutes.get('/products/category/:id', getProductByCategory);

export default productRoutes;
