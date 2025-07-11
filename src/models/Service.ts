import mongoose from 'mongoose';
import slugify from 'slugify';
import type { IEntryDocument } from './Entry';
import { IUserDocument } from './User';

export interface IServiceDocument extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  entries: IEntryDocument[];
  user: IUserDocument;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema<IServiceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    entries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }

  this.slug = slugify(this.name, { lower: true });
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
