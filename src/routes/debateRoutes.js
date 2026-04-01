const express = require("express");
const { authenticate, requireAdmin } = require("../middleware/auth");
const {
  createDebate,
  getAllDebates,
  patchDebate,
  deleteDebate,
} = require("../controllers/debateController");

const router = express.Router();

router.get("/", getAllDebates);
router.post("/", authenticate, requireAdmin, createDebate);
router.patch("/:id", authenticate, requireAdmin, patchDebate);
router.delete("/:id", authenticate, requireAdmin, deleteDebate);

module.exports = router;
