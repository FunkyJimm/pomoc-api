import { Request, Response } from "express";
import InformationService from "../services/information-services";
import Validators from "../utils/validators";

// get all informations list
const getInformations = async(req: Request, res: Response) => {
  try {
    const informations = await InformationService.getInformations()
    return res.status(200).send({
      status: 200,
      data: informations,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// get information details
const getInformationDetails = async(req: Request, res: Response) => {
  const id = req.params.informationId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    const information = await InformationService.getInformationDetails(id)
    return res.status(200).send({
      status: 200,
      data: information,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// add a information
const addInformation = async(req: Request, res: Response) => {
  const content = req.body;
  if (Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await InformationService.addInformation(content)
    return res.status(201).send({
      status: 201,
      message: 'Information has been successfully added.',
    });
  } catch (e: any) {
    return res.status(500).send({
      status: 500,
      message: e.message,
    });
  }
}

// update a information
const updateInformation = async(req: Request, res: Response) => {
  const id = req.params.informationId;
  const content = req.body;
  if (Validators.idCheck(res, id) || Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await InformationService.updateInformation(id, content)
    return res.status(200).send({
      status: 200,
      message: 'Information has been updated.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// delete a information
const deleteInformation = async(req: Request, res: Response) => {
  const id = req.params.informationId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    await InformationService.deleteInformation(id)
    return res.status(200).send({
      status: 200,
      message: 'Information has been deleted.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

export default {
  getInformations,
  getInformationDetails,
  addInformation,
  updateInformation,
  deleteInformation,
}