const express = require('express');
const cors = require('cors');

const combatRoutes = require('./routes/combat.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/combats', combatRoutes);

module.exports = app;
