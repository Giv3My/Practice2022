const userService = require('../services/user-service')

class UserController {
  async registration(req, res) {
    try {
      const { email } = req.body;

      const userData = await userService.registration(email);

      res.header('Authorization', userData.tokens.accessToken);
      res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

      return res.send(userData);
    } catch (e) {
      return res.status(400).send(e.message);
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const userData = await userService.login(email, password);

      res.header('Authorization', userData.tokens.accessToken);
      res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

      return res.send(userData);
    } catch (e) {
      return res.status(401).send(e.message);
    }
  };

  async logout(req, res) {
    try {
      res.clearCookie('refreshToken');

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  };

  async accessToken(req, res) {
    try {
      const { accessToken } = res.locals;
      res.header('Authorization', accessToken);

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  };

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).send({ error: 'Refresh token has been expired' });
      }

      const tokens = await userService.refresh(refreshToken);

      res.header('Authorization', tokens.accessToken);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

      return res.send(tokens);
    } catch (e) {
      console.log(e);
    }
  };

  async getUsers(req, res) {
    try {
      const userIds = req.body;
      const users = await userService.getActiveUsers(userIds);

      return res.send(users);
    } catch (e) {
      console.log(e);
    }
  };
};

module.exports = new UserController();