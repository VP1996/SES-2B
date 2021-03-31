const mongoose = require('mongoose');
const student = require('./user')
const teacher = require('./teacher')
const Schema = mongoose.Schema;

//class model will contain a nested document array of user model documents (students+teacher)
const classSchema = new Schema({
    className: {
        type: String,
        required : true
    },
    students: [student],
    teacher: [teacher],
    startTime: {
        type: Date,
        required: true
    },
    finishTime: {
        type: Date,
        required: true
    }
}, {
        timestamps: true
});

const Class = mongoose.model('Class', classSchema); // create user model using the schema created

module.exports = Class;