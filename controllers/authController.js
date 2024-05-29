const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const users = require('../DB/users.json');

const generateToken = user => jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1m"});

const login = (req, res) => {
    const { username, password } = req.body;

    // Trova l'utente nel database
    const user = users.find(u => u.username === username);

    // Se l'utente non esiste o la password non corrisponde, restituisci un errore
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Credenziali non valide" });
    }

    // Genera il token JWT per l'utente autenticato
    const token = generateToken(user);

    // Invia il token come risposta
    res.json({ token });
};
const authenticateWithJWT = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token mancante. Devi autenticarti." });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token non valido o scaduto. Devi autenticarti." });
        }

        const user = users.find(u => u.username === decoded.username);
        if (!user) {
            return res.status(401).json({ error: "Utente non trovato nel database." });
        }

        req.user = user;

        next();
    });
};


module.exports = {
    login,
    authenticateWithJWT
};
