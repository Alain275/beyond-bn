const express = require("express");
const { authenticate, requireAdmin } = require("../middleware/auth");
const {
  createVideo,
  getAllVideos,
  patchVideo,
  deleteVideo,
} = require("../controllers/videoController");

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", authenticate, requireAdmin, createVideo);
router.patch("/:id", authenticate, requireAdmin, patchVideo);
router.delete("/:id", authenticate, requireAdmin, deleteVideo);

module.exports = router;
