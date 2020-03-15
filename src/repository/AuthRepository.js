const UserModel = require("../models/User");
const UserRepository = require("../repository/UserRepository");

const { generateUserToken } = require("../shared/token");
const { isPasswordCorrect } = require("../shared/bcrypt");

module.exports = {
  async authenticate(email, password) {
    const user = await UserRepository.userExists(email);
    if(!user) return null;

    const isValidPassword = await isPasswordCorrect({ password: user.password, passwordSent: password });
    if(!isValidPassword) return null;

    const token = await generateUserToken(user);
    return token;
  },
};
