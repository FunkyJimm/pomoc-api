import express from 'express';
import login from '../controllers/login-controllers';

const loginRouter = express.Router();

loginRouter.post('/login', login.login);

loginRouter.get('/logout', login.logout);

loginRouter.get('/login-test', login.loginTest);

export = loginRouter;
