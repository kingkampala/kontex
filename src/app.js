const express = require('express');
const { Client } = require('pg');
require('dotenv').config();
const app = express();
const syncDb = require('../src/sync');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'too many requests, please try again later.'
});

app.use(limiter);

const userRoute = require('../route/user');
const courseRoute = require('../route/course');
const lessonRoute = require('../route/lesson');
const searchRoute = require('../route/search');

app.use(`/user`, userRoute);
app.use(`/course`, courseRoute);
app.use(`/lesson`, lessonRoute);
app.use(`/search`, searchRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'SOMETHING WENT WRONG!!!' });
});

const { DB_URL } = process.env;

const connectDb = async () => {
    const client = new Client({
        connectionString: DB_URL,
    });

    try {
        await client.connect();
        console.log('database connection successful');

        await syncDb();
    } catch (err) {
        console.error('database connection error:', err);
    }

    return client;
}

module.exports = { app, connectDb };