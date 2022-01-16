"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Information title is required!'],
        minlength: 2,
        maxlength: 256,
    },
    description: {
        type: String,
        required: [true, 'You need to add description!'],
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    updateDate: {
        type: Date,
        required: false,
    },
});
const InformationModel = (0, mongoose_1.model)('Information', schema);
exports.default = InformationModel;
