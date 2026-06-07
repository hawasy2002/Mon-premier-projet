const Hotel = require("../models/Hotel");

exports.getHotels = async (req, res) => {
  try {
    const data = await Hotel.getAll();
    res.json({ success: true, hotels: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const data = await Hotel.getById(req.params.id);
    if (!data) return res.status(404).json({ error: "Hôtel non trouvé" });
    res.json({ success: true, hotel: data });
      } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const id = await Hotel.create(req.body);
    res.status(201).json({ success: true, message: "Hôtel ajouté", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.updateHotel = async (req, res) => {
  try {
    const updated = await Hotel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Hôtel non trouvé" });
    res.json({ success: true, message: "Hôtel mis à jour" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const deleted = await Hotel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Hôtel non trouvé" });
    exports.updateHotel = async (req, res) => {
  try {
    const updated = await Hotel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Hôtel non trouvé" });
    res.json({ success: true, message: "Hôtel mis à jour" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.deleteHotel = async (req, res) => {
  try {
    const deleted = await Hotel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Hôtel non trouvé" });
    res.json({ success: true, message: "Hôtel supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
