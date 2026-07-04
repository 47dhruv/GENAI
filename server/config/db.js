import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
             const connectionInstance=   await mongoose.connect(`${process.env.MONGODB_URI}/Aipersona`)
     console.log(`\n mongodb connectecd and db host:${connectionInstance.connection.host}`)
   
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};