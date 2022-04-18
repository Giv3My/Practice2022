const md5 = require('md5');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const UserModel = require('../models/user-model');

class UserService {
  async login(email, password) {
    if (email && password) {
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        throw new Error('Incorrect email');
      }

      if (md5(password) !== user.password) {
        throw new Error('Incorrect password');
      }

      const userData = {
        email,
        password: md5(password)
      };

      const tokens = tokenService.generateTokens({ ...userData });
      const userDto = new UserDto(user);

      return {
        user: userDto,
        tokens
      };
    } else {
      throw new Error('Incorrect email or password');
    }
  };

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      return null;
    }

    const tokens = tokenService.generateTokens({ ...userData });

    return { ...tokens };
  };
};

module.exports = new UserService();