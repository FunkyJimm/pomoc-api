"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user-controllers"));
const usersRouter = express_1.default.Router();
usersRouter.get('/users', user_controllers_1.default.getUsers);
usersRouter.get('/users/:userId', user_controllers_1.default.getUserDetails);
usersRouter.post('/users', user_controllers_1.default.addUser);
usersRouter.put('/users/:userId', user_controllers_1.default.updateUser);
usersRouter.delete('/users/:userId', user_controllers_1.default.deleteUser);
module.exports = usersRouter;
