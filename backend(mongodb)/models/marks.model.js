
const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    sem1: {
        type: [Number],
        default: []
    },
    sem2: {
        type: [Number],
        default: []
    },
    sem3: {
        type: [Number],
        default: []
    },
    sem4: {
        type: [Number],
        default: []
    },
    sem5: {
        type: [Number],
        default: []
    },
    sem6: {
        type: [Number],
        default: []
    },
    sem7: {
        type: [Number],
        default: []
    },
    sem8: {
        type: [Number],
        default: []
    }
});

module.exports = mongoose.model('Marks', marksSchema);
