const db = require('../config/db');

/**
 * Crear combate
 */
exports.createCombat = async (data) => {
  const {
    tipo_combate,
    numero_rounds,
    duracion_round,
    fecha_combate,
    id_liga
  } = data;

  const [result] = await db.execute(
    `INSERT INTO combate 
     (tipo_combate, numero_rounds, duracion_round, estado, fecha_combate, id_liga)
     VALUES (?, ?, ?, 'EN_CURSO', ?, ?)`,
    [tipo_combate, numero_rounds, duracion_round, fecha_combate, id_liga]
  );

  return { id_combate: result.insertId };
};

/**
 * Finalizar combate + resultado
 */
exports.finishCombat = async (combatId, data) => {
  const { ganador, metodo_victoria } = data;

  // Guardar resultado
  await db.execute(
    `INSERT INTO resultado_combate 
     (id_combate, ganador, metodo_victoria)
     VALUES (?, ?, ?)`,
    [combatId, ganador, metodo_victoria]
  );

  // Actualizar estado combate
  await db.execute(
    `UPDATE combate SET estado = 'FINALIZADO' WHERE id_combate = ?`,
    [combatId]
  );

  // Actualizar ranking
  await updateRanking(combatId, ganador);

  return { message: 'Combate finalizado correctamente' };
};

/**
 * Actualizar ranking
 */
async function updateRanking(combatId, ganador) {
  // Obtener participantes
  const [fighters] = await db.execute(
    `SELECT id_usuario FROM participante_combate WHERE id_combate = ?`,
    [combatId]
  );

  for (const fighter of fighters) {
    if (fighter.id_usuario === ganador) {
      await db.execute(
        `UPDATE ranking SET victorias = victorias + 1 
         WHERE id_usuario = ?`,
        [fighter.id_usuario]
      );
    } else {
      await db.execute(
        `UPDATE ranking SET derrotas = derrotas + 1 
         WHERE id_usuario = ?`,
        [fighter.id_usuario]
      );
    }
  }
}
