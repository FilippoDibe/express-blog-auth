const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateWithJWT = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token mancante. Devi autenticarti.' });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            let message = "accesso vietato: ";
            switch (err.message) {
                case "jwt expired":
                    message += 'token scaduto';
                    break;
                default:
                    message += 'token non valido';
            }
            return res.status(403).json({ error: message });
        }

        req.user = payload;
        next();
    });
};

const authenticateAdmin = (req, res, next) => {
    const users = readUsersFromFile();
    const user = users.find(u => u.id === req.user.id);

    if (!user || !user.admin) {
        return res.status(403).json({ error: 'Non sei un admin' });
    }

    next();
};

module.exports = {
    authenticateWithJWT,
    authenticateAdmin
};
