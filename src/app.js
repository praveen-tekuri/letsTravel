const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
require('dotenv').config();
const postsRouter = require("./routes/posts.route");
const mailsRouter = require("./routes/mails.route");
const callbacksRouter = require("./routes/callbacks.route");

app.use(express.static('public'));
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/mails', mailsRouter);
app.use('/callbacks', callbacksRouter);

connectDB().then(() => {
    console.log("Database connection established!");
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}...`));
}).catch((error) => {
    console.log("Database connection failed: " + error);
})
