const express = require('express');
const { Client } = require('pg');
require('dotenv').config();
const app = express();
const syncDb = require('../src/sync');
const limiter = require('../middleware/limit');
const errorHandler = require('../middleware/error');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require('../route/user');
const courseRoute = require('../route/course');
const lessonRoute = require('../route/lesson');
const searchRoute = require('../route/search');

app.use(`/user`, userRoute);
app.use(`/course`, courseRoute);
app.use(`/lesson`, lessonRoute);
app.use(`/search`, searchRoute);

app.use(limiter);
app.use(errorHandler);

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