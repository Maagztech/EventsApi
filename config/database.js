import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const URI = process.env.MONGODB_URL;

const connectDB = async () => {
    if (!URI) {
        throw new Error('MONGODB_URL is not defined in .env');
    }

    try {
        await mongoose.connect(URI);
        console.log('Mongodb connection successful');
    } catch (err) {
        console.error('Mongodb connection error:', err);
        process.exit(1);
    }
};

connectDB();
