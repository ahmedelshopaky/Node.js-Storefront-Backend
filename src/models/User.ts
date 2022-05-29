import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Client from '../database';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type UserType = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class User {
  index = async (): Promise<UserType[]> => {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT id, first_name, last_name, password FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users: ${err}`);
    }
  };

  show = async (id: number): Promise<UserType> => {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT id, first_name, last_name, password FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get user: ${err}`);
    }
  };

  create = async (user: UserType): Promise<UserType[]> => {
    try {
      const conn = await Client.connect();
      const hashed = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3)';
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hashed,
      ]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot create user: ${err}`);
    }
  };

  login = async (
    username: string,
    password: string
  ): Promise<UserType | null> => {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      conn.release();
      if (result.rows.length > 1) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Cannot find user: ${err}`);
    }
  };
}
