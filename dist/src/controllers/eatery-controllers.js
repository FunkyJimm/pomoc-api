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
const eatery_services_1 = __importDefault(require("../services/eatery-services"));
const validators_1 = __importDefault(require("../utils/validators"));
// get all eateries list
const getEateries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eateries = yield eatery_services_1.default.getEateries();
        return res.status(200).send({
            status: 200,
            data: eateries,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// get eatery details
const getEateryDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.eateryId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        const eatery = yield eatery_services_1.default.getEateryDetails(id);
        return res.status(200).send({
            status: 200,
            data: eatery,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// add a eatery
const addEatery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    if (validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield eatery_services_1.default.addEatery(content);
        return res.status(201).send({
            status: 201,
            message: 'Eatery has been successfully added.',
        });
    }
    catch (e) {
        return res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});
// update a eatery
const updateEatery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.eateryId;
    const content = req.body;
    if (validators_1.default.idCheck(res, id) || validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield eatery_services_1.default.updateEatery(id, content);
        return res.status(200).send({
            status: 200,
            message: 'Eatery has been updated.',
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// delete a eatery
const deleteEatery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.eateryId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        yield eatery_services_1.default.deleteEatery(id);
        return res.status(200).send({
            status: 200,
            message: 'Eatery has been deleted.',
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
    getEateries,
    getEateryDetails,
    addEatery,
    updateEatery,
    deleteEatery,
};
