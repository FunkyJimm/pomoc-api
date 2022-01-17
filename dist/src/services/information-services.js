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
const information_1 = __importDefault(require("../db/models/information"));
const validators_1 = __importDefault(require("../utils/validators"));
const getInformations = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const informations = yield information_1.default.find();
            if (Object.keys(informations).length === 0) {
                throw Error('Informations list is empty.');
            }
            return informations;
        }
        catch (e) {
            throw Error(`Something went wrong with database. ${e.message}`);
        }
    });
};
const getInformationDetails = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const information = yield information_1.default.findById(id);
            if (!information) {
                throw Error(`Shelter with Id: ${id} is not found.`);
            }
            return information;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const addInformation = function (content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description } = content;
        const publicationDate = Date.now();
        const information = new information_1.default({ title, description, publicationDate });
        try {
            yield information.save();
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const updateInformation = function (id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description } = content;
        const updateDate = Date.now();
        try {
            const information = yield information_1.default.findByIdAndUpdate(id, { title, description, updateDate }, validators_1.default.options);
            if (!information) {
                throw Error(`Information with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const deleteInformation = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const information = yield information_1.default.findByIdAndDelete(id);
            if (!information) {
                throw Error(`Information with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
exports.default = {
    getInformations,
    getInformationDetails,
    addInformation,
    updateInformation,
    deleteInformation,
};
