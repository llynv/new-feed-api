const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    feedId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: String,
    imgs: {
        type: Array,
        required: true
    },
    feedId_userId: {
        type: String,
        unique: true
    },
})

module.exports = mongoose.model('Feed', feedSchema)