import { default as Shelter } from '../db/models/schelter';
import Validators from "../utils/validators";

const getShelters = async function() {
  try {
    const shelters = await Shelter.find()
    if (Object.keys(shelters).length === 0) {
      throw Error('Shelters list is empty.');
    }
    return shelters.map(shelter => (
      {
        id: shelter._id,
        name: shelter.name,
        totalNumberOfBeds: shelter.totalNumberOfBeds,
        occupiedNumberOfBeds: shelter.occupiedNumberOfBeds,
      }
    ));
  } catch (e: any) {
    throw Error(`Something went wrong with database. ${e.message}`);
  }
}

const getShelterDetails = async function(id: string) {
  try {
    const shelter = await Shelter.findById(id)
    if (!shelter) {
      throw Error(`Shelter with Id: ${id} is not found.`);
    }
    return shelter;
  } catch (e: any) {
    throw Error(e.message);
  }
}

const addShelter = async function(content: any) {
  const { name, address, city, zipCode, phone, totalNumberOfBeds } = content;
  const publicationDate = Date.now();
  const shelter = new Shelter({ name, address, city, zipCode, phone, totalNumberOfBeds, publicationDate });

  try {
    await shelter.save()
  } catch (e: any) {
    throw Error(e.message);
  }
}

const updateShelter = async function(id: string, content: any) {
  const { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds } = content;
  const updateDate = Date.now();

  try {
    const shelter = await Shelter.findByIdAndUpdate(id, { name, address, city, zipCode, phone, totalNumberOfBeds, occupiedNumberOfBeds, updateDate }, Validators.options)
    if (!shelter) {
      throw Error(`Shelter with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

const deleteShelter = async function(id: string) {
  try {
    const shelter = await Shelter.findByIdAndDelete(id)
    if (!shelter) {
      throw Error(`Shelter with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

export default {
  getShelters,
  getShelterDetails,
  addShelter,
  updateShelter,
  deleteShelter,
}