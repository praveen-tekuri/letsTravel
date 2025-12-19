const express = require("express");
const router = express.Router();
const {Post} = require("../models/posts.model");
const userAuth = require("../middleware/userAuth");

router.get("/", async(req, res) => {
    try {
        let posts = await Post.find();
        res.send(posts);
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.post("/", userAuth, async(req, res) => {
    try {
        let {title, country, imageUrl, text, description, date} = req.body;
        let imagePath;
        if(imageUrl){
            imagePath = imageUrl
        }else{
            imagePath = req.file.path.substring(req.file.path.indexOf("/"), req.file.path.length);
        }
        let newPost = new Post({
            title, country, imageUrl: imagePath, text, description, date: new Date()
        })
        console.log(req.body);
        await newPost.save();
        res.send("Post has been created");
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.put("/:id", userAuth, async(req, res) => {
    try {
        let id = req.params.id;
        let updatePost = await Post.findByIdAndUpdate({_id: id}, req.body);
        await updatePost.save();
        res.send("Post has been updated");
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.delete("/:id", userAuth, async(req, res) => {
    try {
        let id = req.params.id;
        await Post.findOneAndDelete({_id: id});
        res.send("Post has been deleted")
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.get("/:id", async(req, res) => {
    try {
        let post = await Post.findById({_id: req.params.id});
        res.send(post);
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

module.exports = router;