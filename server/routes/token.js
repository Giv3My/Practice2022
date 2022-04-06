const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/accessToken', (req, res) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).send({ error: 'No token' });
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    res.header('Authorization', accessToken);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(401).send({ error: 'Access token has been expired' });
  }
});

router.get('/refreshToken', (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    const { email, password } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = {
      email,
      password
    };

    const newAccessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: 15 });

    res.header('Authorization', newAccessToken);
    return res.send({ newAccessToken });
  } catch (err) {
    return res.status(401).send({ error: 'Refresh token has been expired' });
  }
});

module.exports = router;