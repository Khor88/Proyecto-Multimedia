import db from './src/config/db';
import fs from 'fs';
import path from 'path';

async function reset() {
  try {
    console.log('🗑️ Resetting database schema...');
    
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Dividir por punto y coma, pero ignorando los que están dentro de ENUMs o comentarios si fuera necesario.
    // Para este caso simple, un split básico suele funcionar si no hay ; dentro de strings.
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const statement of statements) {
      await db.query(statement);
    }
    await db.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('✅ Schema recreated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

reset();
