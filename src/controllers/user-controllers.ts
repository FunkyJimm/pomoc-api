import { Request, Response } from 'express';
import UserService from '../services/user-services';
import Validators from '../utils/validators';

// get all users list
const getUsers = async(req: Request, res: Response) => {
  try {
    const users = await UserService.getUsers()
    return res.status(200).send({
      status: 200,
      data: users,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// get user details
const getUserDetails = async(req: Request, res: Response) => {
  const id = req.params.userId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    const user = await UserService.getUserDetails(id)
    return res.status(200).send({
      status: 200,
      data: user,
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// add a user
const addUser = async(req: Request, res: Response) => {
  const content = req.body;
  if (Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await UserService.addUser(content)
    return res.status(201).send({
      status: 201,
      message: 'User has been successfully added.',
    });
  } catch (e: any) {
    return res.status(500).send({
      status: 500,
      message: e.message,
    });
  }
}

// update a user
const updateUser = async(req: Request, res: Response) => {
  const id = req.params.userId;
  const content = req.body;
  if (Validators.idCheck(res, id) || Validators.contentCheck(res, content)) {
    return;
  }

  try {
    await UserService.updateUser(id, content)
    return res.status(200).send({
      status: 200,
      message: 'User has been updated.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

// delete a user
const deleteUser = async(req: Request, res: Response) => {
  const id = req.params.userId;
  if (Validators.idCheck(res, id)) {
    return;
  }

  try {
    await UserService.deleteUser(id)
    return res.status(200).send({
      status: 200,
      message: 'User has been deleted.',
    });
  } catch (e: any) {
    return res.status(404).send({
      status: 404,
      message: e.message,
    });
  }
}

export default {
  getUsers,
  getUserDetails,
  addUser,
  updateUser,
  deleteUser,
}