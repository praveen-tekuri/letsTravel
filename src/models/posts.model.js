const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date
    },
})

const Post = mongoose.model("Post", postSchema, 'posts');

module.exports = {Post};