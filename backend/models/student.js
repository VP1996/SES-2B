const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auth = require('./authSchema');

//creates a new schema for users which will represent each document added to the collection
const studentSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true,
        index: true // stops duplicates
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true
    },
    studyYear: {
        type: Number
    },
    course: {
        type: String
    },
    faculty: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    campusLocation: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    classAuth: [Auth]
}, {
    timestamps: true

}
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;