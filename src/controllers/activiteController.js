const { Activite } = require("../models/Activite");

exports.getAll = async (req, res) => {
  try {
    const activites = await Activite.getAll();
    res.json({ success: true, activites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.getById = async (req, res) => {
  try {
    const activite = await Activite.findById(req.params.id);
    if (!activite) return res.status(404).json({ error: "Activité non trouvée" });
    res.json({ success: true, activite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getByDestination = async (req, res) => {
  try {
    const activites = await Activite.getByDestination(req.params.destinationId);
    res.json({ success: true, activites });
  } catch (err) {
        console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.create = async (req, res) => {
  try {
    const { nom, description, destination_id, date, prix, max_participants } = req.body;
    const activiteId = await Activite.create({
      nom,
      description,
            destination_id,
      date,
      prix,
      max_participants
    });
    res.status(201).json({ success: true, id: activiteId, message: "Activité créée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.update = async (req, res) => {
  try {
    const { nom, description, date, prix, max_participants } = req.body;
    const updated = await Activite.update(req.params.id, {
      nom,
      description,
      date,
      prix,
      max_participants
    });
    if (!updated) return res.status(404).json({ error: "Activité non trouvée" });
    res.json({ success: true, message: "Activité mise à jour" });
      } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Activite.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Activité non trouvée" });
    res.json({ success: true, message: "Activité supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
      }
    };
