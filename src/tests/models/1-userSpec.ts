import { User, UserType } from '../../models/User';

const user = new User();

describe('User', () => {
  it('user.index should be defined', () => {
    expect(user.index).toBeDefined();
  });

  it('user.show should be defined', () => {
    expect(user.show).toBeDefined();
  });

  it('user.create should be defined', () => {
    expect(user.create).toBeDefined();
  });

  it('user.login should be defined', () => {
    expect(user.login).toBeDefined();
  });

  it('fetch all users', async function () {
    const userInstance: UserType = {
      first_name: 'Ahel',
      last_name: 'Shopaky',
      username: 'ahshopaky',
      password: 'password',
    };
    await user.create(userInstance);
    const users = await user.index();

    expect(users.length).toBeGreaterThan(0);
  });
});
