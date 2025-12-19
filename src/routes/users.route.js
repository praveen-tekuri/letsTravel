const express = require("express");
const router = express.Router();
const {User} = require("../models/users.model");
const bcrypt = require("bcrypt");
const {generateToken} = require("../controllers/auth");

router.post("/register", async(req, res) => {
    try {
        const {emailId, password} = req.body;
        const isEmailExist = await User.findOne({emailId});
        if(isEmailExist){
            res.json({message: "User with email address already exists"})
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({emailId, password: hashPassword})
        await newUser.save();
        res.json({message: "Registration successful"});
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
})

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({emailId: req.body.emailId});
        if(!user){
            res.json({message: "Invalid credentials"})
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
            const token =  generateToken(user);
            res.cookie("user_token", token);
            res.send({
                redirectUrl: '/admin',
                success: 'Success'
            })
        } 
        res.send({message: "Invalid credentials"});    
    } catch (error) {
        // res.status(400).send("ERR: " + error.message);
    }
})

module.exports = router;