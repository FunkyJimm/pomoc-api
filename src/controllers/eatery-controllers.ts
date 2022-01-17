import { Request, Response } from "express";
import EateryService from "../services/eatery-service";
import Validators from "../utils/validators";

// get all eateries list
const getEateries = async(req: Request, res: Response) => {
  try {
    const eateries = await EateryService.getEateries()
    return res.status(200).send({
      status: 200,
      data: eateries,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// get eatery details
const getEateryDetails = async(req: Request, res: Response) => {
  const id = req.params.eateryId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    const eatery = await EateryService.getEateryDetails(id)
    return res.status(200).send({
      status: 200,
      data: eatery,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// add a eatery
const addEatery = async(req: Request, res: Response) => {
  const content = req.body;
  if (Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await EateryService.addEatery(content)
    return res.status(201).send({
      status: 201,
      message: 'Eatery has been successfully added.',
    });
  } catch (e: any) {
    return res.status(500).send({
      status: 500,
      message: e.message,
    });
  }
}

// update a eatery
const updateEatery = async(req: Request, res: Response) => {
  const id = req.params.eateryId;
  const content = req.body;
  if (Validators.idCheck(res, id) || Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await EateryService.updateEatery(id, content)
    return res.status(200).send({
      status: 200,
      message: 'Eatery has been updated.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// delete a eatery
const deleteEatery = async(req: Request, res: Response) => {
  const id = req.params.eateryId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    await EateryService.deleteEatery(id)
    return res.status(200).send({
      status: 200,
      message: 'Eatery has been deleted.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

export default {
  getEateries,
  getEateryDetails,
  addEatery,
  updateEatery,
  deleteEatery,
}