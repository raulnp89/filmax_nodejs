const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, process.env.REFRESH_TOKEN);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

const refreshToken = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  const user = {
    userId: req.user.id,
    email: req.user.email,
    role: req.user.role,
  };
  const token = generateToken(user, false);
  const refreshToken = generateToken(user, true);

  res.status(200).json({
    status: "succeeded",
    data: {
      token,
      refreshToken,
    },
    error: null,
  });
};

module.exports = { verifyToken, refreshToken };
