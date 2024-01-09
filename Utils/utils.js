// const jwt = require("jsonwebtoken");

// const generateToken = (user, isRefreshToken) => {
//   if (isRefreshToken) {
//     return jwt.sign(user, process.env.REFRESH_TOKEN, {
//       expiresIn: "600min",
//     });
//   }
//   return jwt.sign(user, process.env.TOKEN_SECRET, {
//     expiresIn: "150min",
//   });
// };

// module.exports = { generateToken };
