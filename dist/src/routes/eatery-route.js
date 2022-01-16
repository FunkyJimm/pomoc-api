"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const eatery_controller_1 = __importDefault(require("../controllers/eatery-controller"));
const eateryRouter = express_1.default.Router();
eateryRouter.get('/eatery', eatery_controller_1.default.getEateries);
eateryRouter.get('/eatery/:eateryId', eatery_controller_1.default.getEateryDetails);
eateryRouter.post('/eatery', eatery_controller_1.default.addEatery);
eateryRouter.put('/eatery/:eateryId', eatery_controller_1.default.updateEatery);
eateryRouter.delete('/eatery/:eateryId', eatery_controller_1.default.deleteEatery);
module.exports = eateryRouter;
