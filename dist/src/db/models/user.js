"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'User name is required!'],
        minlength: [2, 'User name must have 2 letters or more!'],
        maxlength: [16, 'User name must have less than 17 characters!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [6, 'Password must have 6 letters or more!'],
        maxlength: [32, 'Password must have less than 33 characters!'],
    },
    email: {
        type: String,
        required: [true, 'Email address is required!'],
        minlength: [6, 'Your email address is not valid (too short)!'],
        maxlength: [64, 'Your email address is not valid (too long)!'],
        validate: {
            validator: (email) => {
                return email.includes("@" && ".");
            },
            message: 'Your email address is not valid!'
        },
    },
});
const UserModel = (0, mongoose_1.model)('User', schema);
exports.default = UserModel;
