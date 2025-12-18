const mongoose = require("mongoose");

const callbackModel = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Callback = mongoose.model("Callback", callbackModel, 'callbacks');

module.exports = {Callback}




