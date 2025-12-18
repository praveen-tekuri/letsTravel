const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({id: user._id}, process.env.SECRETE_KEY);
}

const checkToken = (token) => {
    try {
        let result =  jwt.verify(token, process.env.SECRETE_KEY);
        return result
    } catch (error) {
        res.status(400).send("ERR: " + error.message);
    }
}

module.exports = {generateToken, checkToken}