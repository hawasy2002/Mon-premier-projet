const express = require("express");
const router = express.Router();
const {
  getReservations,
  getReservationById,
  getReservationsByUser,
  createReservation,
  updateReservation,
  deleteReservation
} = require("../controllers/reservationController");
const { verifySession, restrictTo } = require("../middlewares/authMiddleware");
router.get("/", verifySession, restrictTo("admin"), getReservations);
router.get("/:id", verifySession, getReservationById);
router.get("/user/:userId", verifySession, getReservationsByUser);
router.post("/", verifySession, createReservation);
router.put("/:id", verifySession, updateReservation);
router.delete("/:id", verifySession, restrictTo("admin"), deleteReservation);
module.exports = router;
