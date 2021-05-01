const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auth = require('./authSchema');

//creates a new schema for users which will represent each document added to the collection
const teacherSchema = new Schema({
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
    teachingYear: {
        type: Number
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

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;