import { default as HelpCenter } from '../db/models/helpCenters';
import Validators from '../utils/validators';

const getHelpCenters = async function() {
  try {
    const helpCenters = await HelpCenter.find()
    if (Object.keys(helpCenters).length === 0) {
      throw Error('Help centers list is empty.');
    }
    return helpCenters.map(helpCenter => (
      {
        id: helpCenter.id,
        name: helpCenter.name,
        mealsAvailability: helpCenter.description,
      }
    ));
  } catch (e: any) {
    throw Error(`Something went wrong with database. ${e.message}`);
  }
}

const getHelpCenterDetails = async function(id: string) {
  try {
    const helpCenter = await HelpCenter.findById(id)
    if (!helpCenter) {
      throw Error(`Help center with Id: ${id} is not found.`);
    }
    return helpCenter;
  } catch (e: any) {
    throw Error(e.message);
  }
}

const addHelpCenter = async function(content: any) {
  const { name, address, city, zipCode, phone, description } = content;
  const publicationDate = Date.now();
  const helpCenter = new HelpCenter({ name, address, city, zipCode, phone, description, publicationDate });

  try {
    await helpCenter.save()
  } catch (e: any) {
    throw Error(e.message);
  }
}

const updateHelpCenter = async function(id: string, content: any) {
  const { name, address, city, zipCode, phone, description } = content;
  const updateDate = Date.now();

  try {
    const helpCenter = await HelpCenter.findByIdAndUpdate(id, { name, address, city, zipCode, phone, description, updateDate }, Validators.options)
    if (!helpCenter) {
      throw Error(`Help center with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

const deleteHelpCenter = async function(id: string) {
  try {
    const helpCenter = await HelpCenter.findByIdAndDelete(id)
    if (!helpCenter) {
      throw Error(`Help center with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

export default {
  getHelpCenters,
  getHelpCenterDetails,
  addHelpCenter,
  updateHelpCenter,
  deleteHelpCenter,
}
