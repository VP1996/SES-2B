const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates a new schema for users which will represent each document added to the collection
const authSchema = new Schema({
    className: {
        type: String,
        required: true
    },
    facialFlag: {
        type: Boolean,
        required: true
    },
    recaptchaFlag: {
        type: Boolean,
        required: true
    },
    emailPinFlag: {
        type: Boolean,
        required: true
    },
    studentID: {
        type: Number,
        required: true
    },
    teacherID: {
        type: Number,
        required: true
    }
}, {
    timestamps: true

}
);

// const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = authSchema;