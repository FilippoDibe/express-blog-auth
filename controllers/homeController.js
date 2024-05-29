const home = (req, res) => {
    res.send(`<h1 style="display: flex; justify-content: center;">Benvenuto nella home del mio Blog</h1>`);
};

module.exports = { home };