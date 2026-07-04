import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/Aipersona`);
        console.log(`\n mongodb connectecd and db host:${connectionInstance.connection.host}`);

        try {
            await connectionInstance.connection.collection('users').dropIndex('username_1');
            console.log('Dropped stale username index from users collection');
        } catch (indexError) {
            if (indexError?.code !== 26) {
                console.warn('Username index cleanup warning:', indexError.message);
            }
        }
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};