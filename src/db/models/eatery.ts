import { Schema, model } from 'mongoose';
import Validators from '../../utils/validators';

interface Eatery {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: number;
  mealsAvailability: boolean;
}

const schema = new Schema<Eatery>({
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
  mealsAvailability: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const EateryModel = model<Eatery>('Eatery', schema);

export default EateryModel;