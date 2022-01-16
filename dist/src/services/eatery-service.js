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
const eatery_1 = __importDefault(require("../db/models/eatery"));
const validators_1 = __importDefault(require("../utils/validators"));
const getEateries = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eateries = yield eatery_1.default.find();
            if (Object.keys(eateries).length === 0) {
                throw Error('Eateries list is empty.');
            }
            return eateries.map(eatery => ({
                id: eatery.id,
                name: eatery.name,
                mealsAvailability: eatery.mealsAvailability,
            }));
        }
        catch (e) {
            throw Error(`Something went wrong with database. ${e.message}`);
        }
    });
};
const getEateryDetails = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eatery = yield eatery_1.default.findById(id);
            if (!eatery) {
                throw Error(`Eatery with Id: ${id} is not found.`);
            }
            return eatery;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const addEatery = function (content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, city, zipCode, phone } = content;
        const publicationDate = Date.now();
        const eatery = new eatery_1.default({ name, address, city, zipCode, phone, publicationDate });
        try {
            yield eatery.save();
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const updateEatery = function (id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, city, zipCode, phone, mealsAvailability } = content;
        const updateDate = Date.now();
        try {
            const eatery = yield eatery_1.default.findByIdAndUpdate(id, { name, address, city, zipCode, phone, mealsAvailability, updateDate }, validators_1.default.options);
            if (!eatery) {
                throw Error(`Eatery with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const deleteEatery = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eatery = yield eatery_1.default.findByIdAndDelete(id);
            if (!eatery) {
                throw Error(`Eatery with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
exports.default = {
    getEateries,
    getEateryDetails,
    addEatery,
    updateEatery,
    deleteEatery,
};
