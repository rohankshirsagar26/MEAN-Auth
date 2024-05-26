const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/db');
const roleRouter = require('./routes/role');
const authRouter = require('./routes/auth');
const responseHandler = require('./utils/helper');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/role', roleRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.use(responseHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
    connectDB();
})