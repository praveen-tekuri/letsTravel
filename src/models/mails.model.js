const mongoose = require("mongoose");

const mailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Mail = mongoose.model("Mail", mailsSchema);

module.exports = {Mail}