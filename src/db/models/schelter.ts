import { Schema, model } from 'mongoose';

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
    required: [true, 'Zip code is required!'],
    validate: {
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
    },
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