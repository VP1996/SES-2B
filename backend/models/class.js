const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthUsers = require('./authSchema');

//class model will contain a nested document array of user model documents (students+teacher)
const classSchema = new Schema({
    className: {
        type: String,
        required : true
    },
    classID: {
        type: Number,
        required: true,
        index: true
    }, 
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    students: [AuthUsers],
    teachers: [AuthUsers]
}, {
        timestamps: true
});

const Class = mongoose.model('Class', classSchema); // create user model using the schema created

module.exports = Class;