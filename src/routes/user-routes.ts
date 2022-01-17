import express from 'express';
import users from '../controllers/user-controllers';

const usersRouter = express.Router();

usersRouter.get('/users', users.getUsers);

usersRouter.get('/users/:userId', users.getUserDetails);

usersRouter.post('/users', users.addUser);

usersRouter.put('/users/:userId', users.updateUser);

usersRouter.delete('/users/:userId', users.deleteUser);

export = usersRouter;
