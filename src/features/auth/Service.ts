import passport from 'passport';
import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import expressJwt from 'express-jwt';
import UserModel from '../user/Model';

passport.use(
  new Strategy(
    async (username, password, done): Promise<void> => {
      try {
        const user = await UserModel.findOne({ username });
        if (!user) {
          return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false);
        }

        return done(null, user);
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
        return done(null, false);
      }
    },
  ),
);

export const authenticate = expressJwt({ secret: process.env.SECRET_KEY });

export const generateToken = (req, res, next): void => {
  req.token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
    expiresIn: '12h',
  });
  next();
};

export const sendToken = (req, res): void => res.send({ token: req.token });

export const logout = (req, res): void => {
  req.logout();
  res.send();
};

export const handleMissingToken = (err, req, res, next): void => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send();
  }
  next();
};
