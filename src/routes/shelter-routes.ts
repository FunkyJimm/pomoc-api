import express from 'express';
import shelters from '../controllers/shelter-controllers';

const sheltersRouter = express.Router();

sheltersRouter.get('/shelters', shelters.getShelters);

sheltersRouter.get('/shelters/:shelterId', shelters.getShelterDetails);

sheltersRouter.post('/shelters', shelters.addShelter);

sheltersRouter.put('/shelters/:shelterId', shelters.updateShelter);

sheltersRouter.delete('/shelters/:shelterId', shelters.deleteShelter);

export = sheltersRouter;
