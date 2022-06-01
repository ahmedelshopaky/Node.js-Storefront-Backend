import { Category, CategoryType } from '../../models/Category';

const category = new Category();

describe('Category', () => {
  it('category.create should be defined', () => {
    expect(category.create).toBeDefined();
  });

  it('fetch all categories', async function () {
    const categoryInstance: CategoryType = {
      name: 'Laptops',
    };
    await category.create(categoryInstance);
    const categories = await category.index();

    expect(categories.length).toBeGreaterThan(0);
  });
});
