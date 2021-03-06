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
const information_services_1 = __importDefault(require("../services/information-services"));
const validators_1 = __importDefault(require("../utils/validators"));
// get all informations list
const getInformations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const informations = yield information_services_1.default.getInformations();
        return res.status(200).send({
            status: 200,
            data: informations,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// get information details
const getInformationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.informationId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        const information = yield information_services_1.default.getInformationDetails(id);
        return res.status(200).send({
            status: 200,
            data: information,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// add a information
const addInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    if (validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield information_services_1.default.addInformation(content);
        return res.status(201).send({
            status: 201,
            message: 'Information has been successfully added.',
        });
    }
    catch (e) {
        return res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});
// update a information
const updateInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.informationId;
    const content = req.body;
    if (validators_1.default.idCheck(res, id) || validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield information_services_1.default.updateInformation(id, content);
        return res.status(200).send({
            status: 200,
            message: 'Information has been updated.',
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// delete a information
const deleteInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.informationId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        yield information_services_1.default.deleteInformation(id);
        return res.status(200).send({
            status: 200,
            message: 'Information has been deleted.',
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
    getInformations,
    getInformationDetails,
    addInformation,
    updateInformation,
    deleteInformation,
};
