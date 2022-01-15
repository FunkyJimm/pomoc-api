"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Shelter name is required!'],
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
    postalCode: {
        required: [true, 'Postal code is required!'],
        validate: {
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
            message: 'Wprowadź poprawny kod pocztowy!'
        },
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
    },
});
const ShelterModel = (0, mongoose_1.model)('Shelter', schema);
exports.default = ShelterModel;
