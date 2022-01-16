import express from 'express';
import information from '../controllers/informations';

const informationRouter = express.Router();

informationRouter.get('/informations', information.getInformations);

informationRouter.get('/informations/:informationId', information.getInformationDetails);

informationRouter.post('/informations', information.addInformation);

informationRouter.put('/informations/:informationId', information.updateInformation);

informationRouter.delete('/informations/:informationId', information.deleteInformation);

export = informationRouter;
