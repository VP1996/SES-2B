const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');

//routes
const users = require('./routes/api/user');
const passport = require('./passport');

const app = express();

//connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Backend'));

//use Routes
app.use('/api', users);
app.use(passport.initialize());
//app.use(passport.session());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server starting on port ${PORT}`));

module.exports = app;
