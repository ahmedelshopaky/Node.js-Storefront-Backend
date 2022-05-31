import express, { NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User, UserType } from '../models/User';

const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret;

const userInstance = new User();
const userRoutes = express.Router();

export const authenticate = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization as unknown as string;
    const decoded = jwt.verify(token, TOKEN_SECRET);
    res.locals.auth = decoded;
    next();
  } catch (err) {
    res.status(401).json({ response: 'Unauthorized' });
  }
};

const index = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const users = await userInstance.index();
    res.json({ users });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const user = await userInstance.show(id);
    res.json({ user });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const user: UserType = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const newUser = await userInstance.create(user);
    res.json({ user: newUser });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const authenticated = await userInstance.login(username, password);
      if (authenticated) {
        const token = jwt.sign({ user: authenticated }, TOKEN_SECRET);
        res.json({ token });
      } else {
        res.status(401).json({ response: 'invalid username or password' });
      }
    } else {
      res.status(400).json({ response: 'username and password are required' });
    }
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

userRoutes.get('/users', authenticate, index);
userRoutes.get('/users/:id', authenticate, show);
userRoutes.post('/users', create);
userRoutes.post('/users/login', login);

export default userRoutes;
