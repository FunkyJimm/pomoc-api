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
const user_services_1 = __importDefault(require("../services/user-services"));
const validators_1 = __importDefault(require("../utils/validators"));
// get all users list
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_services_1.default.getUsers();
        return res.status(200).send({
            status: 200,
            data: users,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// get user details
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        const user = yield user_services_1.default.getUserDetails(id);
        return res.status(200).send({
            status: 200,
            data: user,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// add a user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    if (validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield user_services_1.default.addUser(content);
        return res.status(201).send({
            status: 201,
            message: 'User has been successfully added.',
        });
    }
    catch (e) {
        return res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});
// update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const content = req.body;
    if (validators_1.default.idCheck(res, id) || validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield user_services_1.default.updateUser(id, content);
        return res.status(200).send({
            status: 200,
            message: 'User has been updated.',
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        yield user_services_1.default.deleteUser(id);
        return res.status(200).send({
            status: 200,
            message: 'User has been deleted.',
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
exports.default = {
    getUsers,
    getUserDetails,
    addUser,
    updateUser,
    deleteUser,
};
