import mongoose from 'mongoose';

export interface IEntryDocument extends mongoose.Document {
  supplyId: number;
  description?: string;
  amount: number;
  paidAt: Date;
  dueDate: Date;
  isPaid: boolean;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const entrySchema = new mongoose.Schema<IEntryDocument>(
  {
    supplyId: {
      type: Number,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
