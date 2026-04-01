const express = require("express");
const { authenticate, requireAdmin } = require("../middleware/auth");
const {
  createActivity,
  getAllActivities,
  patchActivity,
  deleteActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/", getAllActivities);
router.post("/", authenticate, requireAdmin, createActivity);
router.patch("/:id", authenticate, requireAdmin, patchActivity);
router.delete("/:id", authenticate, requireAdmin, deleteActivity);

module.exports = router;
