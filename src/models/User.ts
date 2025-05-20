import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IServiceDocument } from './Service';

export interface IUserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  services: IServiceDocument[];
  createdAt: Date;
  updatedAt: Date;
  comparePasswords: (enteredPassword: string, hashedPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePasswords = async function (enteredPassword: string, hashedPassword: string) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

const User = mongoose.model('User', userSchema);

export default User;
