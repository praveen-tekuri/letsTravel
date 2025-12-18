const express = require("express");
const router = express.Router();
const {Mail} = require("../models/mails.model");
const userAuth = require("../middleware/userAuth");

router.get("/", userAuth, async(req, res) => {
    try {
        const mails = await Mail.find();
        res.send(mails);
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.post("/", async(req, res) => {
    try {
        const {name, emailId, message} = req.body;
        const newMail = new Mail({
            name, emailId, message
        })
        await newMail.save();
        res.send("Mail has been created")
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})

router.delete("/:id", userAuth, async(req, res) => {
    try {
        await Mail.findByIdAndDelete({_id: req.params.id});
        res.send("Mail has been deleted")
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})

module.exports = router;