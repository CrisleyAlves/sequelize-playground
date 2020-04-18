const UserRepository = require("@modules/user/repository/UserRepository");
const { generateUserToken } = require("@modules/shared/token");
const { isPasswordCorrect } = require("@modules/shared/bcrypt");

module.exports = {
  async authenticate(email, password) {
    const user = await UserRepository.userExists(email);
    if (!user) return null;

    const isValidPassword = await isPasswordCorrect({ password: user.password, passwordSent: password });
    if (!isValidPassword) return null;

    const token = await generateUserToken(user);
    return token;
  },
};
