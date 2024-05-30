const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { readUsersFromFile } = require('../utilities');
require('dotenv').config();


const generateToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Inserisci tutti i dati richiesti');
    }

    const users = readUsersFromFile();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(400).send('Dati sbagliati');
    }

    const token = generateToken({ id: user.id, username });
    res.json({ token });
};

module.exports = {
    login
};
