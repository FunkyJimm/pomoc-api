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

// Mongoose validators
const zipCodeValidator = {
  validator: (postal: string) => {
    if (postal.length > 6) return false;

    for (let i = 0; i < postal.length; i++) {
        if (i == 2) {
            if (postal[i] !== "-") return false;
        } else {
            if (isNaN(Number(postal[i]))) return false;
        }
    } return true;
  },
  message: 'You need to add correct zip code!'
}

const options = {
  runValidator: true,
  upsert: false,
}

export default {
  contentCheck,
  idCheck,
  zipCodeValidator,
  options,
}