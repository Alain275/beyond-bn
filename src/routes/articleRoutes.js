const express = require("express");
const { authenticate, requireAdmin } = require("../middleware/auth");
const {
  createArticle,
  getAllArticles,
  patchArticle,
  deleteArticle,
} = require("../controllers/articleController");

const router = express.Router();

// Publicly readable articles
router.get("/", getAllArticles);

// Admin-only routes for modifications
router.post("/", authenticate, requireAdmin, createArticle);
router.patch("/:id", authenticate, requireAdmin, patchArticle);
router.delete("/:id", authenticate, requireAdmin, deleteArticle);

module.exports = router;
