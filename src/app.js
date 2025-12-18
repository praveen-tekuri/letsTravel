const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
require('dotenv').config();
const postsRouter = require("./routes/posts.route");
const mailsRouter = require("./routes/mails.route");
const callbacksRouter = require("./routes/callbacks.route");
const usersRouter = require("./routes/users.route");
const {Post} = require("./models/posts.model");
const cookieParser = require("cookie-parser");
const {checkToken} = require("./controllers/auth");

app.use(express.static('public'));
app.use(express.json());
app.set("view engine", 'ejs');
app.use(cookieParser());

app.use('/posts', postsRouter);
app.use('/mails', mailsRouter);
app.use('/callbacks', callbacksRouter);
app.use('/users', usersRouter);

app.get("/landmarks", async(req, res) => {
    try {
        const post = await Post.findById({_id: req.query.id})
        res.render('landmarks', {
            title: post.title,
            imageUrl: post.imageUrl,
            text: post.text,
            country: post.country,
            date: post.date.toLocaleString()
        });
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})


app.get("/admin", (req, res) => {
    try {
        let token = req.cookies['user_token'];
        if(token && checkToken(token)){
            res.render("admin")
        }else{
            res.redirect("/login");
        }
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})

app.get("/login", (req, res) => {
    try {
        let token = req.cookies['user_token'];
        if(token && checkToken(token)){
            res.redirect("/admin")
        }else{
            res.render("login");
        }
    } catch (error) {
        res.status(400).send("ERR: " + error.message)
    }
})

connectDB().then(() => {
    console.log("Database connection established!");
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}...`));
}).catch((error) => {
    console.log("Database connection failed: " + error);
})
