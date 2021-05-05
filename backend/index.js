const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');

//routes
const users = require('./routes/api/user');
const studentsRouter = require('./routes/student');
const teachersRouter = require('./routes/teacher');
const classesRouter = require('./routes/class');

const app = express();

//stop cors error
var cors = require('cors')
app.use(cors())

//connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Backend'));

//use Routes
app.use('/api', users);
app.use('/api/student',studentsRouter);
app.use('/api/teacher',teachersRouter);
app.use('/api/class',classesRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server starting on port ${PORT}`));

module.exports = app;
