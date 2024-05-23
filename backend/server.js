const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/db');

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server started on ${process.env.PORT}`);
    connectDB();
})