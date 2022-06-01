import { Product, ProductType } from '../../models/Product';

const product = new Product();

describe('Product', () => {
  it('product.index should be defined', () => {
    expect(product.index).toBeDefined();
  });

  it('product.show should be defined', () => {
    expect(product.show).toBeDefined();
  });

  it('product.create should be defined', () => {
    expect(product.create).toBeDefined();
  });

  it('product.getTopFiveProducts should be defined', () => {
    expect(product.getTopFiveProducts).toBeDefined();
  });

  it('product.getProductByCategory should be defined', () => {
    expect(product.getProductByCategory).toBeDefined();
  });

  it('fetch all products', async function () {
    const productInstance: ProductType = {
      name: 'Legion Laptop',
      price: 800,
      category_id: 1,
    };
    await product.create(productInstance);
    const products = await product.index();

    expect(products.length).toBeGreaterThan(0);
  });
});
