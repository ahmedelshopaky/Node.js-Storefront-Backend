import { User } from '../../models/User';

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
});
