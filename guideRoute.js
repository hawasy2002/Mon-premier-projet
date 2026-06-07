const express = require("express");
const router = express.Router();
const {
  getGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide
} = require("../controllers/guideController");
const { verifySession, restrictTo } = require("../middlewares/authMiddleware");
router.get("/", verifySession, getGuides);
router.get("/:id", verifySession, getGuideById);
router.post("/", verifySession, restrictTo("admin"), createGuide);
router.put("/:id", verifySession, restrictTo("admin"), updateGuide);
router.delete("/:id", verifySession, restrictTo("admin"), deleteGuide);

module.exports = router;
