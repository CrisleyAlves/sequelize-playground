const UserRepository = require("@repositories/UserRepository");
const { generatePasswordHash } = require("@utils/bcrypt");

const userQueries = {
  async getAllUsers() {
    try {
      const users = await UserRepository.getAll();
      return users;
    } catch (error) {
      return error;
    }
  },
};

const userMutations = {
  async createUser(root, { user }) {
    // @TODO
    // it seems this is the same code in the rest architecture approach
    // Maybe we should move this code to a service

    const { name, email, password } = user;

    try {
      const user = await UserRepository.userExists(email);

      if (user) {
        return new Error('User already exists');
      }

      const passwordHash = await generatePasswordHash(password);
      const createdUser = await UserRepository.save({
        name,
        email,
        password: passwordHash,
      });

      return createdUser;
    } catch (error) {
      return error;
    }
  },
};

module.exports = {
  userQueries,
  userMutations,
};
