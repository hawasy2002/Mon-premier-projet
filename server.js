const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const destinationRoutes = require('./routes/destinations');
const hotelRoutes = require('./routes/hotels');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/Guides', GuidesRoutes);
app.use('/api/Gallery', GalleryRoutes);
app.use('/api/Event', EventRoutes);
app.use('/api/hebergements', hebergementsRoutes);
app.use('/api/Payment', PaymentRoutes);
app.use('/api/Review', ReviewRoutes);
app.use('/api/Emergency', EmergencyRoutes);

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
