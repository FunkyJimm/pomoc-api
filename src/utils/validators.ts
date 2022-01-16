import { Response } from 'express';
import mongoose from 'mongoose';

const contentCheck = function(res: Response, content: Object) {
  if (Object.keys(content).length === 0) {
    return res.status(400).send({
      message: 'Content can not be empty.',
    });
  }
}

const idCheck = function(res: Response, id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Id is not valid',
    });
  }
}

// Mongoose validator options
const options = {
  runValidator: true,
  upsert: false,
}

export default {
  contentCheck,
  idCheck,
  options,
}