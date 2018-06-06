import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import foodtruck from '../controllers/foodtruck';
import account from '../controllers/account';

const router = express();

// connect to db
initializeDb(db => {
  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/foodtrucks', foodtruck({ config, db }));
  router.use('/account', account({ config, db }));
});

export default router;
