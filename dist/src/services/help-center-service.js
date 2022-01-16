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
const helpCenters_1 = __importDefault(require("../db/models/helpCenters"));
const validators_1 = __importDefault(require("../utils/validators"));
const getHelpCenters = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const helpCenters = yield helpCenters_1.default.find();
            if (Object.keys(helpCenters).length === 0) {
                throw Error('Help centers list is empty.');
            }
            return helpCenters.map(helpCenter => ({
                id: helpCenter.id,
                name: helpCenter.name,
                mealsAvailability: helpCenter.description,
            }));
        }
        catch (e) {
            throw Error(`Something went wrong with database. ${e.message}`);
        }
    });
};
const getHelpCenterDetails = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const helpCenter = yield helpCenters_1.default.findById(id);
            if (!helpCenter) {
                throw Error(`Help center with Id: ${id} is not found.`);
            }
            return helpCenter;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const addHelpCenter = function (content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, city, zipCode, phone, description } = content;
        const publicationDate = Date.now();
        const helpCenter = new helpCenters_1.default({ name, address, city, zipCode, phone, description, publicationDate });
        try {
            yield helpCenter.save();
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const updateHelpCenter = function (id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, city, zipCode, phone, description } = content;
        const updateDate = Date.now();
        try {
            const helpCenter = yield helpCenters_1.default.findByIdAndUpdate(id, { name, address, city, zipCode, phone, description, updateDate }, validators_1.default.options);
            if (!helpCenter) {
                throw Error(`Help center with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const deleteHelpCenter = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const helpCenter = yield helpCenters_1.default.findByIdAndDelete(id);
            if (!helpCenter) {
                throw Error(`Help center with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
exports.default = {
    getHelpCenters,
    getHelpCenterDetails,
    addHelpCenter,
    updateHelpCenter,
    deleteHelpCenter,
};
