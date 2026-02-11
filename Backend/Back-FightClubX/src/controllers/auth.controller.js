const authService = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
