const express = require("express");
const router = express.Router();
const {Post} = require("../models/posts.model");

router.get("/", async(req, res) => {
    try {
        let posts = await Post.find();
        res.send(posts);
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.post("/", async(req, res) => {
    try {
        let {title, country, imageUrl, text, description, date} = req.body;
        let newPost = new Post({
            title, country, imageUrl, text, description, date: new Date()
        })
        await newPost.save();
        res.send("Post has been created");
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.put("/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let updatePost = await Post.findByIdAndUpdate({_id: id}, req.body);
        await updatePost.save();
        res.send("Post has been updated");
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.delete("/:id", async(req, res) => {
    try {
        let id = req.params.id;
        await Post.findOneAndDelete({_id: id});
        res.send("Post has been deleted")
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

module.exports = router;