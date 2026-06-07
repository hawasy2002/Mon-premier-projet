const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avisController");
const { verifySession, restrictTo } = require("../middlewares/authMiddleware");

router.get("/destination/:destinationId", verifySession, avisController.getByDestination);
router.get("/rating/:destinationId", verifySession, avisController.getAverageRating);
router.get("/:id", verifySession, avisController.getById);
router.post("/", verifySession, avisController.create);
router.put("/:id", verifySession, avisController.update);
router.delete("/:id", verifySession, avisController.delete);

module.exports = router;
