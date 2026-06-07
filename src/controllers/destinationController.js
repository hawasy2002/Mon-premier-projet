const Destination = require("../models/Destination");

exports.getDestinations = async (req, res) => {
  try {
    const data = await Destination.getAll();
    res.json({ success: true, destinations: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const data = await Destination.getById(req.params.id);
    if (!data) return res.status(404).json({ error: "Destination non trouvée" });
    res.json({ success: true, destination: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const id = await Destination.create(req.body);
    res.status(201).json({ success: true, message: "Destination ajoutée", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const updated = await Destination.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Destination non trouvée" });
    res.json({ success: true, message: "Destination mise à jour" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const deleted = await Destination.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Destination non trouvée" });
    res.json({ success: true, message: "Destination supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
