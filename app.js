const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postsRouter = require("./routers/posts");
const homeRouter = require("./routers/home.js");
const authRouter = require("./routers/auth.js");



app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('./public'));

app.use('/home', homeRouter);
app.use('/posts', postsRouter);

app.use('/auth', authRouter);


// start server
app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});