const AuthRepository = require("../repository/AuthRepository");

module.exports = {
  async login(req, res) {
    const { password, email } = req.body;

    const token = await AuthRepository.authenticate(email, password);
    if(!token) return res.status(401).json({ data: { message: 'Invalid credentials' } });

    return res.status(200).json({ data: { token } });
  }
}
