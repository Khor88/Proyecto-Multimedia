const express = require('express');
const router = express.Router();

const combatController = require('../controllers/combat.controller');

// Crear combate
router.post('/', combatController.createCombat);

// Finalizar combate + ganador
router.post('/:id/result', combatController.finishCombat);

module.exports = router;
