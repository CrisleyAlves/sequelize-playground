const bcrypt = require("bcrypt");

const generatePasswordHash = async password => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

const isPasswordCorrect = async ({ passwordSent, password }) => await bcrypt.compare(passwordSent, password);

module.exports = {
  generatePasswordHash,
  isPasswordCorrect,
};
