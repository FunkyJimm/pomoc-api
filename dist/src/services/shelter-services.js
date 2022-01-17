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
const schelter_1 = __importDefault(require("../db/models/schelter"));
const validators_1 = __importDefault(require("../utils/validators"));
const getShelters = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shelters = yield schelter_1.default.find();
            if (Object.keys(shelters).length === 0) {
                throw Error('Shelters list is empty.');
            }
            return shelters.map(shelter => ({
                id: shelter._id,
                name: shelter.name,
                totalNumberOfBeds: shelter.totalNumberOfBeds,
                occupiedNumberOfBeds: shelter.occupiedNumberOfBeds,
            }));
        }
        catch (e) {
            throw Error(`Something went wrong with database. ${e.message}`);
        }
    });
};
const getShelterDetails = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shelter = yield schelter_1.default.findById(id);
            if (!shelter) {
                throw Error(`Shelter with Id: ${id} is not found.`);
            }
            return shelter;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const addShelter = function (content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, city, zipCode, phone, totalNumberOfBeds } = content;
        const publicationDate = Date.now();
        const shelter = new schelter_1.default({ name, address, city, zipCode, phone, totalNumberOfBeds, publicationDate });
        try {
            yield shelter.save();
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const updateShelter = function (id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds } = content;
        const updateDate = Date.now();
        try {
            const shelter = yield schelter_1.default.findByIdAndUpdate(id, { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds, updateDate }, validators_1.default.options);
            if (!shelter) {
                throw Error(`Shelter with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
const deleteShelter = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shelter = yield schelter_1.default.findByIdAndDelete(id);
            if (!shelter) {
                throw Error(`Shelter with Id: ${id} is not found.`);
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
};
exports.default = {
    getShelters,
    getShelterDetails,
    addShelter,
    updateShelter,
    deleteShelter,
};
