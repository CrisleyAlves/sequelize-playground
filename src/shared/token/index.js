const jwt = require("jsonwebtoken");

const generateUserToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY || 'SECRET_KEY',
    {
      expiresIn: "1h"
    }
  );
};

const getDataFromUserToken = (req, res, next) => {
  // @TODO
  // Add environment variables
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'SECRET_KEY');
    return decoded;
  } catch (error) {
    return {};
  }
};

module.exports = {
  generateUserToken,
  getDataFromUserToken,
};
