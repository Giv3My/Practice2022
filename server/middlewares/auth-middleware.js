const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return next(res.status(401).send({ error: 'No access token' }));
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return res.status(401).send({ error: 'Access token has been expired' });
    }

    res.locals.accessToken = accessToken;

    next();
  } catch (err) {
    console.log(err);
  }
};