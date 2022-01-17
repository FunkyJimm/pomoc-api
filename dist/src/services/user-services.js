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
const user_1 = __importDefault(require("../db/models/user"));
const validators_1 = __importDefault(require("../utils/validators"));
const getUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.default.find();
            if (Object.keys(users).length === 0) {
                throw Error('Users list is empty.');
            }
            return users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
            }));
        }
        catch (e) {
            throw Error(`Something went wrong with database. ${e.message}`);
        }
    });
};
const getUserDetails = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findById(id);
            if (!user) {
                throw Error(`User with Id: ${id} is not found.`);
            }
            return user;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const addUser = function (content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password, email } = content;
        const user = new user_1.default({ name, password, email });
        try {
            yield user.save();
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const updateUser = function (id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password, email } = content;
        try {
            const user = yield user_1.default.findByIdAndUpdate(id, { name, password, email }, validators_1.default.options);
            if (!user) {
                throw Error(`User with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const deleteUser = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findByIdAndDelete(id);
            if (!user) {
                throw Error(`User with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
exports.default = {
    getUsers,
    getUserDetails,
    addUser,
    updateUser,
    deleteUser,
};
