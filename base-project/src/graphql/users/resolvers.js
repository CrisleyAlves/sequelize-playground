const UserRepository = require("@repositories/UserRepository");
const { generatePasswordHash } = require("@utils/bcrypt");
const { emailAlreadyInUse } = require("@utils/messages");
const { conflict, serverError } = require("@utils/http");

const userQueries = {
  async getAllUsers() {
    try {
      const users = await UserRepository.getAll();
      return users;
    } catch (error) {
      return serverError(error);
    }
  },
  async getUserData(root, { user_id }) {
    try {
      const userData = await UserRepository.getUserData(user_id);
      return userData;
    } catch (error) {
      return serverError(error);
    }
  },
};

const userMutations = {
  async createUser(root, { user }) {
    const { name, email, password } = user;

    try {
      const user = await UserRepository.userExists(email);

      if (user) {
        return conflict(emailAlreadyInUse);
      }

      const passwordHash = await generatePasswordHash(password);
      const createdUser = await UserRepository.save({
        name,
        email,
        password: passwordHash,
      });

      return createdUser;
    } catch (error) {
      return serverError(error);
    }
  },
};

module.exports = {
  userQueries,
  userMutations,
};
