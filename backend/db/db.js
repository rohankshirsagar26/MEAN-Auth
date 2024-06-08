const mongoose = require('mongoose');
const seedBooksData = require('../seed');
const dotenv = require('dotenv').config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING);
        if (process.argv.includes('--seed')) {
            await seedBooksData();
        }
        console.log(`Connected to database ${connection.connection.name}`);
    } catch (error) {
        console.log(`Error connecting to database ${connection.connection.name}: ${error.message}`);
    }
}

module.exports = connectDB;