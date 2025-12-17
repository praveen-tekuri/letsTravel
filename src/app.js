require('dotenv').config();
const express = require("express");
const app = express();
const {connectDB} = require("./config/database");

const postsRouter = require("./routes/posts.route");

app.use(express.static('public'));
app.use(express.json());

app.use('/posts', postsRouter);


connectDB().then(() => {
    console.log("Database connection established!");
    app.listen(process.env.PORT, () => console.log("Server is listening on port 3000..."));
}).catch((error) => {
    console.log("Database connection failed: " + error);
})
