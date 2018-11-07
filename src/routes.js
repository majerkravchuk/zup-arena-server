const express = require('express');

const authController = require('./controllers/authController');
const profileController = require('./controllers/profileController');
const matchesController = require('./controllers/matches');

const authRouter = express.Router();
authRouter.post('/', authController.create);
authRouter.get('/test-user', authController.testUser);

const profileRouter = express.Router();
profileRouter.get('/', profileController.show);

const matchesRouter = express.Router();
matchesRouter.post('/', matchesController.create);
matchesRouter.post('/:id/finish', matchesController.finish);
matchesRouter.post('/:id/kill', matchesController.kill);
matchesRouter.post('/:id/death', matchesController.death);

module.exports = [
  {
    path: '/auth',
    router: authRouter,
  }, {
    path: '/profile',
    router: profileRouter,
  }, {
    path: '/matches',
    router: matchesRouter,
  },
];