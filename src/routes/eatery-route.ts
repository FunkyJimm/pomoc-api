import express from 'express';
import eatery from '../controllers/eatery-controller';

const eateryRouter = express.Router();

eateryRouter.get('/eatery', eatery.getEateries);

eateryRouter.get('/eatery/:eateryId', eatery.getEateryDetails);

eateryRouter.post('/eatery', eatery.addEatery);

eateryRouter.put('/eatery/:eateryId', eatery.updateEatery);

eateryRouter.delete('/eatery/:eateryId', eatery.deleteEatery);

export = eateryRouter;
