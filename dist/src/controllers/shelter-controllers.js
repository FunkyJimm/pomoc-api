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
const shelter_services_1 = __importDefault(require("../services/shelter-services"));
const validators_1 = __importDefault(require("../utils/validators"));
// get all shelters list
const getShelters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelters = yield shelter_services_1.default.getShelters();
        return res.status(200).send({
            status: 200,
            data: shelters,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// get shelter details
const getShelterDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.shelterId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        const shelter = yield shelter_services_1.default.getShelterDetails(id);
        return res.status(200).send({
            status: 200,
            data: shelter,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// add a shelter
const addShelter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    if (validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield shelter_services_1.default.addShelter(content);
        return res.status(201).send({
            status: 201,
            message: 'Shelter has been successfully added.',
        });
    }
    catch (e) {
        return res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});
// update a shelter
const updateShelter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.shelterId;
    const content = req.body;
    if (validators_1.default.idCheck(res, id) || validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield shelter_services_1.default.updateShelter(id, content);
        return res.status(200).send({
            status: 200,
            message: 'Shelter has been updated.',
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// delete a shelter
const deleteShelter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.shelterId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        yield shelter_services_1.default.deleteShelter(id);
        return res.status(200).send({
            status: 200,
            message: 'Shelter has been deleted.',
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
exports.default = {
    getShelters,
    getShelterDetails,
    addShelter,
    updateShelter,
    deleteShelter,
};
