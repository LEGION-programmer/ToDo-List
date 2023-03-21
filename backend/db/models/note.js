const mongoose = require('mongoose')
const { Schema } = mongoose;

// definie note schema
const noteSchema = new Schema({
    title: {
        type: String,
        minLenght: 5,
        maxLenght: 20
    },
    description: {
        type: String,
        maxLenght: 50
    },
    taskStatus: {
        type: String,
        required: true
    },
    owner: {
        type: String
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note