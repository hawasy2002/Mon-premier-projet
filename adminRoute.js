const express = require('express');
const router = express.Router();

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next(); // autorisé
  } else {
    res.status(403).json({ message: 'Accès interdit : admin requis' });
  }
}

router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find(); // suppose que tu as un modèle User
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/users/:id', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/settings', isAdmin, (req, res) => {
  res.json({ message: 'Page des paramètres admin' });
});

module.exports = router;
