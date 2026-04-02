const express = require("express");
const { authenticate, requireAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createArticle,
  getAllArticles,
  getArticleById,
  patchArticle,
  deleteArticle,
  uploadImage,
} = require("../controllers/articleController");

const router = express.Router();

// Publicly readable articles
router.get("/", getAllArticles);
router.get("/:id", getArticleById);

// Image upload endpoint (Admin only)
router.post("/upload-image", authenticate, requireAdmin, upload.single("image"), uploadImage);

// Admin-only routes for modifications
router.post("/", authenticate, requireAdmin, createArticle);
router.patch("/:id", authenticate, requireAdmin, patchArticle);
router.delete("/:id", authenticate, requireAdmin, deleteArticle);

module.exports = router;
