const { Avis } = require("../models/Avis");

exports.getByDestination = async (req, res) => {
  try {
    const avis = await Avis.getByDestination(req.params.destinationId);
    const moyenne = await Avis.getAverageRating(req.params.destinationId);
    res.json({ success: true, avis, moyenne });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.getById = async (req, res) => {
  try {
    const avis = await Avis.getById(req.params.id);
    if (!avis) return res.status(404).json({ error: "Avis non trouvé" });
    res.json({ success: true, avis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: "Non authentifié" });
    }
        const { destination_id, note, commentaire } = req.body;
    const avisId = await Avis.create({
      destination_id,
      user_id: req.session.user.id,
      note,
      commentaire
    });
    res.status(201).json({ success: true, id: avisId, message: "Avis posté" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.update = async (req, res) => {
  try {
    const { note, commentaire } = req.body;
    const updated = await Avis.update(req.params.id, { note, commentaire });
    if (!updated) return res.status(404).json({ error: "Avis non trouvé" });
    res.json({ success: true, message: "Avis mis à jour" });
  } catch (err) {
        console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Avis.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Avis non trouvé" });
    res.json({ success: true, message: "Avis supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.getAverageRating = async (req, res) => {
  try {
    const moyenne = await Avis.getAverageRating(req.params.destinationId);
    res.json({ success: true, moyenne });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
