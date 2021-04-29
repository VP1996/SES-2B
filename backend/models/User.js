const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates a new schema for users which will represent each document added to the collection
const userSchema = new Schema({
        userID: {
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
        fullName: {
            type: String,
            required: true
        },
        studyYear: {
            type: Number
        },
        teachingYear: {
            type: Number
        },
        course: {
            type: String
        },
        faculty: {
            type: String
        },
        emailID: {
            type: String,
            required: true
        },
        campusLocation: {
            type: String,
            required: true
        },
        isTeacher: {
            type: Boolean,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        isStudent: {
            type: Boolean,
            required: true
        },
    }, {
        timestamps: true

    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;