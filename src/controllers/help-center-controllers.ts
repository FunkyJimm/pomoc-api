import { Request, Response } from "express";
import HelpCenterService from "../services/help-center-services";
import Validators from "../utils/validators";

// get all help centers list
const getHelpCenters = async(req: Request, res: Response) => {
  try {
    const helpCenters = await HelpCenterService.getHelpCenters()
    return res.status(200).send({
      status: 200,
      data: helpCenters,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// get help center details
const getHelpCenterDetails = async(req: Request, res: Response) => {
  const id = req.params.helpcenterId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    const helpCenter = await HelpCenterService.getHelpCenterDetails(id)
    return res.status(200).send({
      status: 200,
      data: helpCenter,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// add a help center
const addHelpCenter = async(req: Request, res: Response) => {
  const content = req.body;
  if (Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await HelpCenterService.addHelpCenter(content)
    return res.status(201).send({
      status: 201,
      message: 'Help center has been successfully added.',
    });
  } catch (e: any) {
    return res.status(500).send({
      status: 500,
      message: e.message,
    });
  }
}

// update a help center
const updateHelpCenter = async(req: Request, res: Response) => {
  const id = req.params.helpcenterId;
  const content = req.body;
  if (Validators.idCheck(res, id) || Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await HelpCenterService.updateHelpCenter(id, content)
    return res.status(200).send({
      status: 200,
      message: 'Help center has been updated.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// delete a help center
const deleteHelpCenter = async(req: Request, res: Response) => {
  const id = req.params.helpcenterId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    await HelpCenterService.deleteHelpCenter(id)
    return res.status(200).send({
      status: 200,
      message: 'Help center has been deleted.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

export default {
  getHelpCenters,
  getHelpCenterDetails,
  addHelpCenter,
  updateHelpCenter,
  deleteHelpCenter,
}