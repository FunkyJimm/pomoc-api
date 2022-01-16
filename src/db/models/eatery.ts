import { Schema, model } from 'mongoose';

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
  mealsAvailability: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const EateryModel = model<Eatery>('Eatery', schema);

export default EateryModel;