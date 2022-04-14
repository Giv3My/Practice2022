const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: 15 });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: 30 });

    return { accessToken, refreshToken };
  };

  validateAccessToken(token) {
    try {
      const { email, password } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return { email, password };
    } catch (e) {
      return null;
    }
  };

  validateRefreshToken(token) {
    try {
      const { email, password } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return { email, password };
    } catch (e) {
      return null;
    }
  };
};

module.exports = new TokenService();