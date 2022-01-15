import { Request, Response } from "express";
import { default as Shelter } from '../db/models/schelter';

// get all shelters list
const getShelters = async(req: Request, res: Response) => {
  Shelter.find()
  .then(shelters => {
    if (Object.keys(shelters).length === 0) {
      return res.status(404).send({
        message: 'Error. Shelters list are empty.'
      })
    }
    const sheltersList = shelters.map(shelter => (
      {
        id: shelter._id,
        name: shelter.name,
        totalNumberOfBeds: shelter.totalNumberOfBeds,
        occupiedNumberOfBeds: shelter.occupiedNumberOfBeds,
      }
    ));
    res.send(sheltersList);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Something went wrong with the server :( Try again later.'
    });
  });
}

// get shelter details
const getShelterDetails = async(req: Request, res: Response) => {
  const id = req.params.shelterId;

  Shelter.findById(id)
  .then(shelter => {
    if (!shelter) {
      return res.status(404).send({
        message: `Shelter with Id: ${id} is not found.`
      });
    }
    res.send(shelter);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Shelter with Id: ${id} is not found.`
      })
    }
    return res.status(500).send({
      message: `Error retrieving shelter with Id: ${id}. Try again later!`
    });
  });
}

// add a shelter
const addShelter = async(req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: 'Content can not be empty.'
    });
  }

  const { name, address, city, zipCode, phone, totalNumberOfBeds } = req.body;
  const shelter = new Shelter({ name, address, city, zipCode, phone, totalNumberOfBeds });

  shelter.save(err => {
    if (err) {
      res.status(500).send(err.message || 'Error. Shelter can not be added.');
    } else {
      res.send('Shelter has been successfully added.')
    }
  });
}

// update a shelter
const updateShelter = async(req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: 'Content can not be empty.'
    });
  }

  const id = req.params.shelterId;
  const { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds } = req.body;
  
  const options = {
    runValidator: true,
    upsert: false,
  }

  Shelter.findByIdAndUpdate(id, { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds }, options, (err) => {
    if (err) {
      res.status(404).send({
        message: `Shelter with Id: ${id} is not found.`
      });
    } else {
      res.send('Shelter has been updated.');
    }
  });
}

// delete a shelter
const deleteShelter = async(req: Request, res: Response) => {
  const id = req.params.shelterId;

  Shelter.findByIdAndDelete(id, null, (err) => {
    if (err) {
      res.status(404).send({
        message: `Shelter with Id: ${id} is not found.`
      });
    } else {
      res.send('Shelter has been deleted.')
    }
  });
}

export default {
  getShelters,
  getShelterDetails,
  addShelter,
  updateShelter,
  deleteShelter,
}