const jwt = require("jsonwebtoken");

const generateToken = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(user, process.env.REFRESH_TOKEN, {
      expiresIn: "60min",
    });
  }
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "15min",
  });
};

module.exports = generateToken;
