const AuthRepository = require("@repositories/AuthRepository");
const { invalidCredentials } = require("@utils/messages");
const { serverError, unauthorized } = require("@utils/http");

const authenticationMutations = {
  async authenticate(root, { auth }) {
    const { email, password } = auth;

    try {
      const token = await AuthRepository.authenticate(email, password);
      if (!token) return unauthorized(invalidCredentials);

      return { token };
    } catch (error) {
      return serverError(error);
    }
  },
};

module.exports = { authenticationMutations };
