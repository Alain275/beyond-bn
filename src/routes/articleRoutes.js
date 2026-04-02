const express = require("express");
const { authenticate, requireAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createArticle,
  getAllArticles,
  uploadArticleImage,
  getArticleById,
  patchArticle,
  deleteArticle,
} = require("../controllers/articleController");

const router = express.Router();

// Publicly readable articles
router.get("/", getAllArticles);
router.get("/:id", getArticleById);

// Admin-only routes for modifications
router.post("/", authenticate, requireAdmin, createArticle);
router.post(
  "/upload-image",
  authenticate,
  requireAdmin,
  (req, res, next) => {
    upload.single("image")(req, res, (error) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      return next();
    });
  },
  uploadArticleImage,
);
router.patch("/:id", authenticate, requireAdmin, patchArticle);
router.delete("/:id", authenticate, requireAdmin, deleteArticle);

module.exports = router;
