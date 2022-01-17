import express from 'express';
import helpCenter from '../controllers/help-center-controller';

const helpCenterRouter = express.Router();

helpCenterRouter.get('/helpcenter', helpCenter.getHelpCenters);

helpCenterRouter.get('/helpcenter/:helpcenterId', helpCenter.getHelpCenterDetails);

helpCenterRouter.post('/helpcenter', helpCenter.addHelpCenter);

helpCenterRouter.put('/helpcenter/:helpcenterId', helpCenter.updateHelpCenter);

helpCenterRouter.delete('/helpcenter/:helpcenterId', helpCenter.deleteHelpCenter);

export = helpCenterRouter;
