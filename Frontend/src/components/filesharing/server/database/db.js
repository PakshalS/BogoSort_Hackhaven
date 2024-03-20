import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = async () => {
    const USERNAME = 'shettyaadi9';
    const PASSWORD = 'aadi@2004';

    const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.v2ff3xl.mongodb.net/Files?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;