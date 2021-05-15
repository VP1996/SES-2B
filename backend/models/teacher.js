const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auth = require('./authSchema');
const bcrypt = require('bcrypt')

//creates a new schema for users which will represent each document added to the collection
const teacherSchema = new Schema({
    userid: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
        index: true // stops duplicates
    },
    password: {
        type: String,
        trim: true,
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

teacherSchema.pre('save', async function (next){
    if (this.isModified("password") || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
            next()
        } catch (error) {
            next(error)
        }
    } else {
        next();
    }
  })

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;