"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const help_center_controllers_1 = __importDefault(require("../controllers/help-center-controllers"));
const helpCenterRouter = express_1.default.Router();
helpCenterRouter.get('/helpcenter', help_center_controllers_1.default.getHelpCenters);
helpCenterRouter.get('/helpcenter/:helpcenterId', help_center_controllers_1.default.getHelpCenterDetails);
helpCenterRouter.post('/helpcenter', help_center_controllers_1.default.addHelpCenter);
helpCenterRouter.put('/helpcenter/:helpcenterId', help_center_controllers_1.default.updateHelpCenter);
helpCenterRouter.delete('/helpcenter/:helpcenterId', help_center_controllers_1.default.deleteHelpCenter);
module.exports = helpCenterRouter;
