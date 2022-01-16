"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const information_controller_1 = __importDefault(require("../controllers/information-controller"));
const informationRouter = express_1.default.Router();
informationRouter.get('/informations', information_controller_1.default.getInformations);
informationRouter.get('/informations/:informationId', information_controller_1.default.getInformationDetails);
informationRouter.post('/informations', information_controller_1.default.addInformation);
informationRouter.put('/informations/:informationId', information_controller_1.default.updateInformation);
informationRouter.delete('/informations/:informationId', information_controller_1.default.deleteInformation);
module.exports = informationRouter;
