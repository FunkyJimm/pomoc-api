"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
        required: [true, 'Zip code is required!'],
        minlength: 6,
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
            message: 'You need to add correct zip code!'
        },
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
const HelpCentersModel = (0, mongoose_1.model)('HelpCenters', schema);
exports.default = HelpCentersModel;
