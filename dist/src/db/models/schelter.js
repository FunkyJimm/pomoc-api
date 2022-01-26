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
        required: [true, 'Shelter name is required!'],
        minlength: 2,
        maxlength: 256,
    },
    address: {
        type: Object,
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
    coordinates: {
        type: { lat: Number, lon: Number },
        required: [true, 'Coordinates is required!'],
    },
    phone: {
        type: Number,
        required: false,
    },
    totalNumberOfBeds: {
        type: Number,
        required: true,
    },
    occupiedNumberOfBeds: {
        type: Number,
        required: false,
        default: 0,
    },
});
const ShelterModel = (0, mongoose_1.model)('Shelter', schema);
exports.default = ShelterModel;
