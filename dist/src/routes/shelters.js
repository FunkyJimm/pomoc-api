"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const shelters_1 = __importDefault(require("../controllers/shelters"));
const sheltersRouter = express_1.default.Router();
sheltersRouter.get('/shelters', shelters_1.default.getShelters);
sheltersRouter.get('/shelters/:shelterId', shelters_1.default.getShelterDetails);
sheltersRouter.post('/shelters', shelters_1.default.addShelter);
sheltersRouter.put('/shelters/:shelterId', shelters_1.default.updateShelter);
sheltersRouter.delete('/shelters/:shelterId', shelters_1.default.deleteShelter);
module.exports = sheltersRouter;
