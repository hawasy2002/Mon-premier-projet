const { Galerie } = require("../models/Galerie");

exports.getByDestination = async (req, res) => {
  try {
    const images = await Galerie.getByDestination(req.params.destinationId);
    res.json({ success: true, images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getById = async (req, res) => {
  try {
    const image = await Galerie.getById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image non trouvée" });
    res.json({ success: true, image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.create = async (req, res) => {
  try {
    const { destination_id, image_url, titre, description } = req.body;
    const imageId = await Galerie.create({
      destination_id,
      image_url,
      titre,
      description
    });
    res.status(201).json({ success: true, id: imageId, message: "Image ajoutée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.delete = async (req, res) => {
  try {
        const deleted = await Galerie.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Image non trouvée" });
    res.json({ success: true, message: "Image supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.update = async (req, res) => {
  try {
    const { titre, description } = req.body;
    const updated = await Galerie.update(req.params.id, { titre, description });
    if (!updated) return res.status(404).json({ error: "Image non trouvée" });
    res.json({ success: true, message: "Image mise à jour" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
  };
