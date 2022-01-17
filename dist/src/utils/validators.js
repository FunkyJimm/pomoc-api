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
// Mongoose validators
const zipCodeValidator = {
    validator: (postal) => {
        if (postal.length > 6)
            return false;
        for (let i = 0; i < postal.length; i++) {
            if (i == 2) {
                if (postal[i] !== "-")
                    return false;
            }
            else {
                if (isNaN(Number(postal[i])))
                    return false;
            }
        }
        return true;
    },
    message: 'You need to add correct zip code!'
};
const options = {
    runValidator: true,
    upsert: false,
};
exports.default = {
    contentCheck,
    idCheck,
    zipCodeValidator,
    options,
};
