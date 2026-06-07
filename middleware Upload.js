
const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|avi/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé"), false);
  }
}

const limits = { fileSize: 5 * 1024 * 1024 };
const upload = multer({ storage, fileFilter, limits });

app.post("/api/destinations/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ message: "Image de destination uploadée avec succès", file: req.file });
});

app.post("/api/hotels/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ message: "Image d’hôtel uploadée avec succès", file: req.file });
});

app.post("/api/guides/upload", authMiddleware, upload.single("photo"), (req, res) => {
  res.json({ message: "Photo de guide uploadée avec succès", file: req.file });
});


app.post("/api/events/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ message: "Image d’événement uploadée avec succès", file: req.file });
});

app.post("/api/gallery/upload", authMiddleware, upload.single("media"), (req, res) => {
  res.json({ message: "Fichier multimédia ajouté à la galerie avec succès", file: req.file });
});

app.post("/api/hebergements/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({
    message: "Image d’hébergement uploadée avec succès",
    file: req.file
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur TAARU-SÉNÉGAL lancé sur le port ${PORT}`);
});
