const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/AuthDB');
        console.log(`Connected to database ${connection.connection.name}`);
    } catch (error) {
        console.log(`Error connecting to database ${connection.connection.name}: ${error.message}`);
    }
}

module.exports = connectDB;