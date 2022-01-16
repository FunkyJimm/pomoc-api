"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const information_1 = __importDefault(require("../controllers/information"));
const informationRouter = express_1.default.Router();
informationRouter.get('/information', information_1.default.getInformations);
informationRouter.get('/information/:informationId', information_1.default.getInformationDetails);
informationRouter.post('/information', information_1.default.addInformation);
informationRouter.put('/information/:informationId', information_1.default.updateInformation);
informationRouter.delete('/information/:informationId', information_1.default.deleteInformation);
module.exports = informationRouter;
