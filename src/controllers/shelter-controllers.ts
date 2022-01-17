import { Request, Response } from "express";
import ShelterService from "../services/shelter-services";
import Validators from "../utils/validators";

// get all shelters list
const getShelters = async(req: Request, res: Response) => {
  try {
    const shelters = await ShelterService.getShelters()
    return res.status(200).send({
      status: 200,
      data: shelters,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// get shelter details
const getShelterDetails = async(req: Request, res: Response) => {
  const id = req.params.shelterId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    const shelter = await ShelterService.getShelterDetails(id)
    return res.status(200).send({
      status: 200,
      data: shelter,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// add a shelter
const addShelter = async(req: Request, res: Response) => {
  const content = req.body;
  if (Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await ShelterService.addShelter(content)
    return res.status(201).send({
      status: 201,
      message: 'Shelter has been successfully added.',
    });
  } catch (e: any) {
    return res.status(500).send({
      status: 500,
      message: e.message,
    });
  }
}

// update a shelter
const updateShelter = async(req: Request, res: Response) => {
  const id = req.params.shelterId;
  const content = req.body;
  if (Validators.idCheck(res, id) || Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await ShelterService.updateShelter(id, content)
    return res.status(200).send({
      status: 200,
      message: 'Shelter has been updated.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// delete a shelter
const deleteShelter = async(req: Request, res: Response) => {
  const id = req.params.shelterId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    await ShelterService.deleteShelter(id)
    return res.status(200).send({
      status: 200,
      message: 'Shelter has been deleted.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

export default {
  getShelters,
  getShelterDetails,
  addShelter,
  updateShelter,
  deleteShelter,
}