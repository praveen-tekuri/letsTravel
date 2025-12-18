const {checkToken} = require("../controllers/auth");

const userAuth = (req, res, next) => {
    const token = req.cookies['user_token'];
    if(token && checkToken(token)){
        next();
    }else{
        res.status(400).send("Not authorized");
    }
}

module.exports = userAuth;