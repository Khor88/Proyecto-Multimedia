import db from './src/config/db';

async function check() {
  try {
    const [rows] = await db.execute('SHOW COLUMNS FROM usuario');
    console.log(rows);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

check();
