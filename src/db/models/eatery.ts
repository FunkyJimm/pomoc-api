import { Schema, model } from 'mongoose';
import Validators from '../../utils/validators';

interface Eatery {
  name: string;
  address: object;
  city: string;
  zipCode: string;
  coordinates: object;
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
    type: Object,
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
  coordinates: {
    type: { lat: Number, lon: Number },
    required: [true, 'Coordinates is required!'],
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