const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.get('/', (req, res) => res.send('backend'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server starting on port ${PORT}`));

//connect database
connectDB();
