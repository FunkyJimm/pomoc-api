import { Schema, model } from 'mongoose';

interface HelpCenters {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: number;
  description: string;
}

const schema = new Schema<HelpCenters>({
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
  description: {
    type: String,
    required: [true, 'You need to add description about this help center!'],
  },
});

const HelpCentersModel = model<HelpCenters>('HelpCenters', schema);

export default HelpCentersModel;