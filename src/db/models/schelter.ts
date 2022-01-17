import { Schema, model } from 'mongoose';
import Validators from '../../utils/validators';

interface Shelter {
  name: string;
  address: string;
  city: string;
  zipCode: string;
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
  totalNumberOfBeds: {
    type: Number,
    required: true,
  },
  occupiedNumberOfBeds: {
    type: Number,
    required: false,
  },
});

const ShelterModel = model<Shelter>('Shelter', schema);

export default ShelterModel;