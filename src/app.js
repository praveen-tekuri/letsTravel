const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
require('dotenv').config();
const postsRouter = require("./routes/posts.route");
const mailsRouter = require("./routes/mails.route");
const callbacksRouter = require("./routes/callbacks.route");
const {Post} = require("./models/posts.model");

app.use(express.static('public'));
app.use(express.json());
app.set("view engine", 'ejs');

app.use('/posts', postsRouter);
app.use('/mails', mailsRouter);
app.use('/callbacks', callbacksRouter);

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

connectDB().then(() => {
    console.log("Database connection established!");
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}...`));
}).catch((error) => {
    console.log("Database connection failed: " + error);
})
