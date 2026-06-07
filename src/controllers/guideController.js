const Guide = require("../models/Guide");

exports.getGuides = async (req, res) => {
  try {
    const data = await Guide.getAll();
    res.json({ success: true, guides: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const data = await Guide.getById(req.params.id);
    if (!data) return res.status(404).json({ error: "Guide non trouvé" });
    res.json({ success: true, guide: data });
      } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.createGuide = async (req, res) => {
  try {
    const id = await Guide.create(req.body);
    res.status(201).json({ success: true, message: "Guide ajouté", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const updated = await Guide.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: "Guide non trouvé" });
    res.json({ success: true, message: "Guide mis à jour" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteGuide = async (req, res) => {
  try {
    const deleted = await Guide.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Guide non trouvé" });
    res.json({ success: true, message: "Guide supprimé" });
  } catch (err) {
    console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
  }
};
