const express = require("express");
const router = express.Router();
const activiteController = require("../controllers/activiteController");
const { verifySession, restrictTo } = require("../middlewares/authMiddleware");

router.get("/", verifySession, activiteController.getAll);
router.get("/:id", verifySession, activiteController.getById);
router.get("/destination/:destinationId", verifySession, activiteController.getByDestination);
router.post("/", verifySession, restrictTo("admin"), activiteController.create);
router.put("/:id", verifySession, restrictTo("admin"), activiteController.update);
router.delete("/:id", verifySession, restrictTo("admin"), activiteController.delete);
module.exports = router;
