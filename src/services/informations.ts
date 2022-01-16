import { default as Information } from '../db/models/information';
import Validators from '../utils/validators';

const getInformations = async function() {
  try {
    const informations = await Information.find()
    if (Object.keys(informations).length === 0) {
      throw Error('Informations list is empty.');
    }
    return informations;
  } catch (e: any) {
    throw Error(`Something went wrong with database. ${e.message}`);
  }
}

const getInformationDetails = async function(id: string) {
  try {
    const information = await Information.findById(id)
    if (!information) {
      throw Error(`Shelter with Id: ${id} is not found.`);
    }
    return information;
  } catch (e: any) {
    throw Error(e.message);
  }
}

const addInformation = async function(content: any) {
  const { title, description } = content;
  const publicationDate = Date.now();
  const information = new Information({ title, description, publicationDate });

  try {
    await information.save()
  } catch (e: any) {
    throw Error(e.message);
  }
}

const updateInformation = async function(id: string, content: any) {
  const { title, description } = content;
  const updateDate = Date.now();

  try {
    const information = await Information.findByIdAndUpdate(id, { title, description, updateDate }, Validators.options)
    if (!information) {
      throw Error(`Information with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

const deleteInformation = async function(id: string) {
  try {
    const information = await Information.findByIdAndDelete(id)
    if (!information) {
      throw Error(`Information with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

export default {
  getInformations,
  getInformationDetails,
  addInformation,
  updateInformation,
  deleteInformation,
}
