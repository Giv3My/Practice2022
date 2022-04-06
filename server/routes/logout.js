const router = require('express').Router();

router.post('/', (req, res) => {
  res.clearCookie('refreshToken');

  return res.sendStatus(200);
});

module.exports = router;