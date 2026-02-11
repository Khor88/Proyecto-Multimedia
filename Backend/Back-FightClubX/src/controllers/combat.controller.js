const combatService = require('../services/combat.service');

/**
 * Crear combate
 */
exports.createCombat = async (req, res) => {
  try {
    const combat = await combatService.createCombat(req.body);
    res.status(201).json(combat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Finalizar combate y guardar resultado
 */
exports.finishCombat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await combatService.finishCombat(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
