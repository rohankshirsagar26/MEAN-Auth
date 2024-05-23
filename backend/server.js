const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server started on ${3000}`);
})