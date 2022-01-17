import { Schema, model } from 'mongoose';
import Validators from '../../utils/validators';

interface HelpCenter {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: number;
  description: string;
}

const schema = new Schema<HelpCenter>({
  name: {
    type: String,
    required: [true, 'Eatery name is required!'],
    minlength: 2,
    maxlength: 256,
  },
  address: {
    type: String,
    required: [true, 'Address is required!'],
  },
  city: {
    type: String,
    required: [true, 'City is required!'],
  },
  zipCode: {
    type: String,
    required: [true, 'Zip code is required!'],
    minlength: 6,
    validate: Validators.zipCodeValidator,
  },
  phone: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: [true, 'You need to add description about this help center!'],
  },
});

const HelpCentersModel = model<HelpCenter>('HelpCenter', schema);

export default HelpCentersModel;