
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const sequelize = new Sequelize(
  process.env.DB_NAME || "taaru_senegal",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log("Connexion MySQL réussie ✅"))
  .catch(err => console.error("Erreur de connexion ❌", err));
const User = sequelize.define("User", {
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  mot_de_passe: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("user", "admin", "guide", "hotelier"), defaultValue: "user" }
});

const Destination = sequelize.define("Destination", {
  nom: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  localisation: { type: DataTypes.STRING },
  prix: { type: DataTypes.FLOAT }
});

const Hotel = sequelize.define("Hotel", {
  nom: { type: DataTypes.STRING, allowNull: false },
  adresse: { type: DataTypes.STRING },
  prix: { type: DataTypes.FLOAT },
  image: { type: DataTypes.STRING }
});

const Hebergement = sequelize.define("Hebergement", {
  nom: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  adresse: { type: DataTypes.STRING },
  prix: { type: DataTypes.FLOAT },
  image: { type: DataTypes.STRING }
});

const Reservation = sequelize.define("Reservation", {
  date: { type: DataTypes.DATE, allowNull: false },
  statut: { type: DataTypes.ENUM("en_attente", "confirmee", "annulee"), defaultValue: "en_attente" }
});

const Guide = sequelize.define("Guide", {
  nom: { type: DataTypes.STRING, allowNull: false },
  langue: { type: DataTypes.STRING },
  contact: { type: DataTypes.STRING },
  photo: { type: DataTypes.STRING }
});
const Event = sequelize.define("Event", {
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATE },
  lieu: { type: DataTypes.STRING },
  image: {
    type: DataTypes.STRING
  }
});
const Gallery = sequelize.define("Gallery", {
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { type: DataTypes.TEXT, },
  media: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(
      "image",
      "video"),
    defaultValue: "image",
  },
});
const Payment = sequelize.define("Payment", {
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  methode: {
    type: DataTypes.ENUM(
      "wave",
      "orange_money",
      "free_money",
      "carte_bancaire"
    ),
    allowNull: false,
  },
  statut: {
    type: DataTypes.ENUM(
      "pending",
      "success",
      "failed"
    ),
    defaultValue: "pending",
  },
  transactionId: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Reservation);
Reservation.belongsTo(User);

Destination.hasMany(Reservation);
Reservation.belongsTo(Destination);

.hasMany(Reservation);
Reservation.HotelbelongsTo(Hotel);

Hebergement.hasMany(Reservation);
Reservation.belongsTo(Hebergement);

Guide.hasMany(Reservation);
Reservation.belongsTo(Guide);

Event.hasMany(Reservation);
Reservation.HotelbelongsTo(Event);

Gallery.hasMany(Reservation);
Reservation.HotelbelongsTo(Gallery);

Payment.hasMany(Reservation);
Reservation.HotelbelongsTo(Payments);



function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|avi/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error("Type de fichier non autorisé"), false);
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

app.post("/api/destinations/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ message: "Image de destination uploadée avec succès", file: req.file });
});

app.post("/api/hotels/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ message: "Image d’hôtel uploadée avec succès", file: req.file });
});

app.post("/api/hebergements/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ message: "Image d’hébergement uploadée avec succès", file: req.file });
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

sequelize.sync({ alter: true })
  .then(() => console.log("Tables synchronisées ✅"))
  .catch(err => console.error("Erreur sync ❌", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur TAARU-SÉNÉGAL lancé sur le port ${PORT}`));

