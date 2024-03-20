import mongoose from "mongoose";
import dotenv from 'dotenv';
import File from './File'; // Import the File model

dotenv.config();

const DBConnection = async () => {
    const USERNAME = 'shettyaadi9';
    const PASSWORD = 'aadi@2004';

    const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.v2ff3xl.mongodb.net/Files?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');

        // Insert a new File instance
        const newFile = new File({
            path: 'path/to/file',
            name: 'file.txt',
            downloadCount: 0
        });

        await newFile.save();
        console.log('File saved successfully', newFile);
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;