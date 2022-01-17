"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const information_controllers_1 = __importDefault(require("../controllers/information-controllers"));
const informationRouter = express_1.default.Router();
informationRouter.get('/informations', information_controllers_1.default.getInformations);
informationRouter.get('/informations/:informationId', information_controllers_1.default.getInformationDetails);
informationRouter.post('/informations', information_controllers_1.default.addInformation);
informationRouter.put('/informations/:informationId', information_controllers_1.default.updateInformation);
informationRouter.delete('/informations/:informationId', information_controllers_1.default.deleteInformation);
module.exports = informationRouter;
