"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentCheck = function (res, content) {
    if (Object.keys(content).length === 0) {
        return res.status(400).send({
            message: 'Content can not be empty.'
        });
    }
};
exports.default = {
    contentCheck,
};
