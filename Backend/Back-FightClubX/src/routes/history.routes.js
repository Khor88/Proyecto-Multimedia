const router = require('express').Router();
const db = require('../config/db');
const { auth } = require('../middlewares/auth.middleware');

router.get('/', auth, async (req, res) => {
  const [rows] = await db.execute(`
    SELECT c.*, r.ganador, r.metodo_victoria
    FROM combate c
    JOIN resultado_combate r ON r.id_combate = c.id_combate
    WHERE c.id_combate IN (
      SELECT id_combate FROM participante_combate
      WHERE id_usuario = ?
    )
    ORDER BY fecha_combate DESC
  `, [req.user.id]);

  res.json(rows);
});

module.exports = router;
