import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User, UserType } from '../models/User';

const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret;

const userRoutes = (req: express.Request, res: express.Response) => {
  //
};

export default userRoutes;
