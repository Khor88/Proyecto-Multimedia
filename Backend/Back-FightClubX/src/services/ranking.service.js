const db = require('../config/db');

exports.updateRanking = async (ligaId, ganadorId, perdedorId) => {
  await db.execute(`
    UPDATE ranking SET victorias = victorias + 1
    WHERE id_usuario = ? AND id_liga = ?
  `, [ganadorId, ligaId]);

  await db.execute(`
    UPDATE ranking SET derrotas = derrotas + 1
    WHERE id_usuario = ? AND id_liga = ?
  `, [perdedorId, ligaId]);
};
