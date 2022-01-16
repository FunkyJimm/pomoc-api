"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contentCheck = function (res, content) {
    if (Object.keys(content).length === 0) {
        return res.status(400).send({
            message: 'Content can not be empty.',
        });
    }
};
const idCheck = function (res, id) {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Id is not valid',
        });
    }
};
// Mongoose validator options
const options = {
    runValidator: true,
    upsert: false,
};
exports.default = {
    contentCheck,
    idCheck,
    options,
};
