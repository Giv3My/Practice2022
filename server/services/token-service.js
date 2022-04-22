const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '12h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '24h' });

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