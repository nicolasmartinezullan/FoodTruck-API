import { Router } from 'express';
import passport from 'passport';

import Account from '../models/account';
import {
  generateAccessToken,
  respond,
  authenticate,
} from '../middleware/authMiddleware';

export default ({ config, db }) => {
  const api = Router();

  // '/v1/account/register'
  api.post('/register', (req, res) => {
    Account.register(
      new Account({ username: req.body.email }),
      req.body.password,
      (err, account) => {
        if (err) {
          res.send(err);
          return;
        }

        passport.authenticate('local', {
          session: false,
        })(req, res, () => {
          res.status(200).send('Successfully created new account');
        });
      }
    );
  });

  // '/v1/account/login'
  api.post(
    '/login',
    passport.authenticate('local', {
      session: false,
      scope: [],
    }),
    generateAccessToken,
    respond
  );

  // '/v1/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    // req.session.destroy(err => {
    //   if (err) {
    //     res.send(err);
    //     return;
    //   }
    //   res.send('Successfully logged out');
    // });
    req.logout();
    // delete req.session;
    res.send('Successfully logged out');
  });

  // '/v1/account/me'
  api.get('/me', authenticate, (req, res) => {
    res.json(req.user);
  });

  return api;
};
