const express = require("express");
const router = express.Router();
const galerieController = require("../controllers/galerieController");
const { verifySession, restrictTo } = require("../middlewares/authMiddleware");

router.get("/destination/:destinationId", verifySession, galerieController.getByDestination);
router.get("/:id", verifySession, galerieController.getById);
router.post("/", verifySession, restrictTo("admin"), galerieController.create);
router.put("/:id", verifySession, restrictTo("admin"), galerieController.update);
router.delete("/:id", verifySession, restrictTo("admin"), galerieController.delete);
module.exports = router;
