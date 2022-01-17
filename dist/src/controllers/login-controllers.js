"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_services_1 = __importDefault(require("../services/login-services"));
const validators_1 = __importDefault(require("../utils/validators"));
// login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    if (validators_1.default.contentCheck(res, content)) {
        return;
    }
    const { name, password } = content;
    try {
        const user = yield login_services_1.default.login(name, password);
        if (user) {
            req.session.loggedin = true;
            req.session.user_id = user._id;
            return res.status(200).send({
                status: 200,
                message: 'Logged in successfully!',
            });
        }
        else {
            throw Error('You have no permission');
        }
    }
    catch (e) {
        return res.status(403).send({
            status: 403,
            message: e.message,
        });
    }
});
// logout function
const logout = (req, res) => {
    if (req.session.loggedin) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).send({
                    status: 500,
                    message: 'Logout unsuccessful. Try again.',
                });
            }
        });
    }
    return res.status(200).send({
        status: 200,
        message: 'Logout successfully!',
    });
};
// login test function
const loginTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.loggedin) {
        res.send('Logged in');
    }
    else {
        res.send('Not loggedin');
    }
});
exports.default = {
    login,
    logout,
    loginTest,
};
