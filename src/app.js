const express = require('express');
//const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const userRoute = require('../route/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(`/user`, userRoute);

const connectDb = () => {
    const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI : process.env.MONGO_URL;

    if (!mongoUrl) {
        throw new Error('MongoDb URL environment variable is not set');
    }
    return mongoose
        .connect(mongoUrl, {
            dbName: process.env.NODE_ENV === 'test' ? 'microshop' : 'microshop-main',
            bufferCommands: true
        })
        .then(() => {
            console.log(`connected to ${process.env.NODE_ENV === 'test' ? 'test' : 'development'} database`);
        })
        .catch((err) => {
            console.error('database connection error:', err);
        });
}

module.exports = { app, connectDb };