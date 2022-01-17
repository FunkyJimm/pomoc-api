import { default as Eatery } from '../db/models/eatery';
import Validators from '../utils/validators';

const getEateries = async function() {
  try {
    const eateries = await Eatery.find()
    if (Object.keys(eateries).length === 0) {
      throw Error('Eateries list is empty.');
    }
    return eateries.map(eatery => (
      {
        id: eatery.id,
        name: eatery.name,
        mealsAvailability: eatery.mealsAvailability,
      }
    ));
  } catch (e: any) {
    throw Error(`Something went wrong with database. ${e.message}`);
  }
}

const getEateryDetails = async function(id: string) {
  try {
    const eatery = await Eatery.findById(id)
    if (!eatery) {
      throw Error(`Eatery with Id: ${id} is not found.`);
    }
    return eatery;
  } catch (e: any) {
    throw Error(e.message);
  }
}

const addEatery = async function(content: any) {
  const { name, address, city, zipCode, phone } = content;
  const publicationDate = Date.now();
  const eatery = new Eatery({ name, address, city, zipCode, phone, publicationDate });

  try {
    await eatery.save()
  } catch (e: any) {
    throw Error(e.message);
  }
}

const updateEatery = async function(id: string, content: any) {
  const { name, address, city, zipCode, phone, mealsAvailability } = content;
  const updateDate = Date.now();

  try {
    const eatery = await Eatery.findByIdAndUpdate(id, { name, address, city, zipCode, phone, mealsAvailability, updateDate }, Validators.options)
    if (!eatery) {
      throw Error(`Eatery with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

const deleteEatery = async function(id: string) {
  try {
    const eatery = await Eatery.findByIdAndDelete(id)
    if (!eatery) {
      throw Error(`Eatery with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

export default {
  getEateries,
  getEateryDetails,
  addEatery,
  updateEatery,
  deleteEatery,
}
