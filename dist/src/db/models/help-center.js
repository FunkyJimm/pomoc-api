"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validators_1 = __importDefault(require("../../utils/validators"));
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Eatery name is required!'],
        minlength: 2,
        maxlength: 256,
    },
    address: {
        type: String,
        required: [true, 'Address is required!'],
    },
    city: {
        type: String,
        required: [true, 'City is required!'],
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required!'],
        minlength: 6,
        validate: validators_1.default.zipCodeValidator,
    },
    phone: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: [true, 'You need to add description about this help center!'],
    },
});
const HelpCentersModel = (0, mongoose_1.model)('HelpCenter', schema);
exports.default = HelpCentersModel;
