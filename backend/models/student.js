const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auth = require('./authSchema');
const bcrypt = require('bcrypt')

//creates a new schema for users which will represent each document added to the collection
const studentSchema = new Schema({
    userid: {
        type: Number,
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

studentSchema.pre('save', async function (next){
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;