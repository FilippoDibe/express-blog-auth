const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController");
const { authenticateWithJWT } = require("../controllers/authController");


// Rotte pubbliche
router.get("/", postController.index);
router.get("/:slug", postController.show);

// Rotte protette
router.post("/", authenticateWithJWT, postController.create);
router.delete("/:slug", postController.destroy);

// Rotte per il download dell'immagine
router.get("/:slug/download", postController.downloadImage);

module.exports = router;
