import { Schema, model } from 'mongoose';
import Validators from '../../utils/validators';

interface Shelter {
  name: string;
  address: object;
  city: string;
  zipCode: string;
  coordinates: object;
  phone: number;
  totalNumberOfBeds: number;
  occupiedNumberOfBeds: number;
}

const schema = new Schema<Shelter>({
  name: {
    type: String,
    required: [true, 'Shelter name is required!'],
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
  totalNumberOfBeds: {
    type: Number,
    required: true,
  },
  occupiedNumberOfBeds: {
    type: Number,
    required: false,
    default: 0,
  },
});

const ShelterModel = model<Shelter>('Shelter', schema);

export default ShelterModel;