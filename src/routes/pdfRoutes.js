const express = require("express");
const { authenticate, requireAdmin } = require("../middleware/auth");
const {
  createPDF,
  getAllPDFs,
  getPDFById,
  patchPDF,
  deletePDF,
  downloadPDF,
} = require("../controllers/pdfController");

const router = express.Router();

router.get("/", getAllPDFs);
router.get("/:id", getPDFById);
router.get("/:id/download", downloadPDF);
router.post("/", authenticate, requireAdmin, createPDF);
router.patch("/:id", authenticate, requireAdmin, patchPDF);
router.delete("/:id", authenticate, requireAdmin, deletePDF);

module.exports = router;