import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as expressJwt from 'express-jwt';
import UserModel from '../features/user/Model';

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

// export const authenticate = expressJwt({ secret: process.env.SECRET_KEY });
export const authenticate = expressJwt({ secret: 'secret1234' });

export const generateToken = (req, res, next): void => {
  // req.token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
  req.token = jwt.sign({ id: req.user.id }, 'secret1234', {
    expiresIn: '12h',
  });
  next();
};

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
