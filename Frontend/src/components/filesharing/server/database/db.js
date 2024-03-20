import mongoose from "mongoose";
import dotenv from 'dotenv';
import File from './models/file.js'

dotenv.config();

const DBConnection = async () => {
    const USERNAME = 'dikshantbadawadagi';
    const PASSWORD = 'new1234';

    const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.v2ff3xl.mongodb.net/Files`;
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');

        const newFile = new File({
            path: 'path/to/file',
            name: 'file.txt',
            downloadCount: 0
        });

        await newFile.save();
        console.log("File saved sucessfully",newFile);

    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;