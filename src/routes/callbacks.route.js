const express = require("express");
const router = express.Router();
const {Callback} = require("../models/callbacks.model");

router.get("/", async(req, res) => {
    try {
        const callbacks = await Callback.find();
        res.send(callbacks);
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})

router.post("/", async(req, res) => {
    try {
       let newCallback = new Callback({phoneNumber: req.body.phoneNumber})
       await newCallback.save();
       res.send("Callback request has been sent");
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})

router.delete("/:id", async(req, res) => {
    try {
        await Callback.findByIdAndDelete({_id: req.params.id});
        res.send("Callback request has been deleted");
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})


module.exports = router