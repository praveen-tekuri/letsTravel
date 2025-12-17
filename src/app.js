const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
require('dotenv').config();
const postsRouter = require("./routes/posts.route");

app.use(express.static('public'));
app.use(express.json());

app.use('/posts', postsRouter);

connectDB().then(() => {
    console.log("Database connection established!");
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}...`));
}).catch((error) => {
    console.log("Database connection failed: " + error);
})
