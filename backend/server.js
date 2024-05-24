const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/db');
const roleRouter = require('./routes/role');
const userRouter = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/role', roleRouter);
app.use('/api/v1/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
    connectDB();
})