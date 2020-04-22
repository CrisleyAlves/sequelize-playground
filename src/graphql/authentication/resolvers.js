const AuthRepository = require("@repositories/AuthRepository");

const authenticationMutations = {
  async authenticate(root, { auth }) {
    const { email, password } = auth;

    try {
      const token = await AuthRepository.authenticate(email, password);
      if (!token) return false;

      return { token };
    } catch (error) {
      return error;
    }
  },
};

module.exports = { authenticationMutations };
