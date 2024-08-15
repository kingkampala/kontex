const express = require('express');
const { Client } = require('pg');
require('dotenv').config();
const app = express();
const syncDb = require('../src/sync');

const userRoute = require('../route/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(`/user`, userRoute);

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