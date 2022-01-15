import { Schema, model } from 'mongoose';

interface Information {
  title: string;
  description: string;
  publicationDate: Date;
  updateDate: Date;
}

const schema = new Schema<Information>({
  title: {
    type: String,
    required: [true, 'Information title is required!'],
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: [true, 'You need to add description about this help center!'],
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  updateDate: {
    type: Date,
    required: false,
  },
});

const InformationModel = model<Information>('Information', schema);

export default InformationModel;