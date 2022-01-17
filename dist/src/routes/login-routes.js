"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const login_controllers_1 = __importDefault(require("../controllers/login-controllers"));
const loginRouter = express_1.default.Router();
loginRouter.post('/login', login_controllers_1.default.login);
loginRouter.get('/logout', login_controllers_1.default.logout);
loginRouter.get('/login-test', login_controllers_1.default.loginTest);
module.exports = loginRouter;
