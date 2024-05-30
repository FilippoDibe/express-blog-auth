const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postsRouter = require("./routers/posts");
const homeRouter = require("./routers/home");
const authRouter = require("./routers/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/home', homeRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});
