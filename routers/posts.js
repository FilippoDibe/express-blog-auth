const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController");
const { authenticateWithJWT } = require('../middlewares/authMiddleware');

// Rotte pubbliche
router.get("/", postController.index);
router.get("/:slug", postController.show);
router.delete("/:slug", postController.destroy);
router.get("/:slug/download", postController.downloadImage);

// Rotta per creare post, protetta da JWT
router.post('/create', authenticateWithJWT, (req, res) => {
    const post = req.body; // Simulazione di salvataggio del post
    res.status(201).json({ message: 'Post creato con successo', post });
});

module.exports = router;
