const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

//routes
const users = require('./routes/api/user');
const studentsRouter = require('./routes/student');
const teachersRouter = require('./routes/teacher');
const classesRouter = require('./routes/class');

require('dotenv').config(); // sensitive information

const app = express();

//stop cors error
var cors = require('cors')
app.use(cors())

//connect to mongo cluster 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to Mongo Cluster established.");
});

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Backend'));

// Passport middleware
app.use(passport.initialize());
//Passport config
require("./config/passport-student")(passport);
require("./config/passport-teacher")(passport);

//use Routes
// app.use('/api', users);
app.use('/api/student',studentsRouter);
app.use('/api/teacher',teachersRouter);
app.use('/api/class',classesRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server starting on port ${PORT}`));

module.exports = app;
