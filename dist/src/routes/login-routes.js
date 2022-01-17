"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controllers/login-controller"));
const loginRouter = express_1.default.Router();
loginRouter.post('/login', login_controller_1.default.login);
loginRouter.get('/logout', login_controller_1.default.logout);
loginRouter.get('/login-test', login_controller_1.default.loginTest);
module.exports = loginRouter;
