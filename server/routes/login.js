const router = require('express').Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
require('dotenv').config();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = {
      email,
      password: md5(password)
    };

    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: 15 });
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: 30 });

    res.header('Authorization', accessToken);
    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 1000, httpOnly: true });

    return res.sendStatus(200);
  }
});

module.exports = router;