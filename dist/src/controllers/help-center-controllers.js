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
const help_center_services_1 = __importDefault(require("../services/help-center-services"));
const validators_1 = __importDefault(require("../utils/validators"));
// get all help centers list
const getHelpCenters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const helpCenters = yield help_center_services_1.default.getHelpCenters();
        return res.status(200).send({
            status: 200,
            data: helpCenters,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// get help center details
const getHelpCenterDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.eateryId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        const helpCenter = yield help_center_services_1.default.getHelpCenterDetails(id);
        return res.status(200).send({
            status: 200,
            data: helpCenter,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// add a help center
const addHelpCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    if (validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield help_center_services_1.default.addHelpCenter(content);
        return res.status(201).send({
            status: 201,
            message: 'Help center has been successfully added.',
        });
    }
    catch (e) {
        return res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});
// update a help center
const updateHelpCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.eateryId;
    const content = req.body;
    if (validators_1.default.idCheck(res, id) || validators_1.default.contentCheck(res, content)) {
        return;
    }
    try {
        yield help_center_services_1.default.updateHelpCenter(id, content);
        return res.status(200).send({
            status: 200,
            message: 'Help center has been updated.',
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 404,
            message: e.message,
        });
    }
});
// delete a help center
const deleteHelpCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.eateryId;
    if (validators_1.default.idCheck(res, id)) {
        return;
    }
    try {
        yield help_center_services_1.default.deleteHelpCenter(id);
        return res.status(200).send({
            status: 200,
            message: 'Help center has been deleted.',
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
    getHelpCenters,
    getHelpCenterDetails,
    addHelpCenter,
    updateHelpCenter,
    deleteHelpCenter,
};
