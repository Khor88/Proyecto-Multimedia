import db from './src/config/db';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // 1. Limpiar tablas (Opcional, con cuidado)
    // await db.execute('SET FOREIGN_KEY_CHECKS = 0');
    // await db.execute('TRUNCATE TABLE ranking');
    // await db.execute('TRUNCATE TABLE participante_combate');
    // await db.execute('TRUNCATE TABLE combate');
    // await db.execute('TRUNCATE TABLE liga');
    // await db.execute('TRUNCATE TABLE usuario');
    // await db.execute('SET FOREIGN_KEY_CHECKS = 1');

    // 2. Crear Usuario Test
    const hashedPassword = await bcrypt.hash('123456', 10);
    const [userResult] = await db.execute(
      'INSERT INTO usuario (nombre, email, password, rol, peso, altura, edad, disciplina) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      ['Pablo Test', 'pablo@test.com', hashedPassword, 'Presidente', 75.5, 1.80, 25, 'Boxing']
    );
    const userId = (userResult as any).insertId;
    console.log(`✅ User created with ID: ${userId}`);

    // 3. Crear Ligas
    const [leagueResult] = await db.execute(
      'INSERT INTO liga (nombre, division, descripcion, tipo, id_usuario_creador) VALUES (?, ?, ?, ?, ?)',
      ['LIGA PRO-FIGHT', 'Regional Madrid', 'Liga profesional de combate regional', 'public', userId]
    );
    const leagueId = (leagueResult as any).insertId;
    console.log(`✅ League created with ID: ${leagueId}`);

    // 4. Unir usuario a la liga (Ranking)
    await db.execute(
      'INSERT INTO ranking (id_liga, id_usuario, victorias, derrotas, puntos, posicion) VALUES (?, ?, ?, ?, ?, ?)',
      [leagueId, userId, 5, 2, 1250, 1]
    );
    console.log('✅ User added to league ranking');

    // 5. Crear Combate Programado
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const [combatResult] = await db.execute(
      'INSERT INTO combate (tipo, num_rounds, duracion_round, estado, fecha, id_liga) VALUES (?, ?, ?, ?, ?, ?)',
      ['MMA', 3, 300, 'programado', nextWeek, leagueId]
    );
    const combatId = (combatResult as any).insertId;
    console.log(`✅ Combat created with ID: ${combatId}`);

    // 6. Participante en combate
    await db.execute(
      'INSERT INTO participante_combate (id_combate, id_usuario, rol_en_combate) VALUES (?, ?, ?)',
      [combatId, userId, 'Luchador1']
    );
    console.log('✅ User assigned to combat');

    console.log('✨ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
