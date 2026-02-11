const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Login de usuario
 */
exports.login = async (email, password) => {
  const [users] = await db.execute(
    `SELECT * FROM usuario WHERE email = ?`,
    [email]
  );

  if (users.length === 0) throw new Error('Usuario no encontrado');

  const user = users[0];

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    {
      id: user.id_usuario,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id: user.id_usuario,
      nombre: user.nombre,
      rol: user.rol
    }
  };
};
