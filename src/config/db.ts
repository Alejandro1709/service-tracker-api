import mongoose from 'mongoose';

const connectDb = async (uri: string) => {
  try {
    await mongoose.connect(uri);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
