const md5 = require('md5');

const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const UserModel = require('../models/user-model');
const generatePassword = require('../helpers/generatePassword');

class UserService {
  async registration(email) {
    if (email) {
      const candidate = await UserModel.findOne({ email });

      if (candidate) {
        throw new Error(`User with email ${email} has already registered`);
      }

      const password = generatePassword();

      const user = await UserModel.create({ email, password: md5(password), username: email.split('@')[0] });
      const tokens = tokenService.generateTokens({ email: user.email, password: user.password });
      const userDto = new UserDto(user);

      return {
        user: {
          ...userDto,
        },
        generatedPassword: password,
        tokens
      };
    } else {
      throw new Error('Incorrect email');
    }
  };

  async login(email, password) {
    if (email && password) {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error('Incorrect email');
      }

      if (md5(password) !== user.password) {
        throw new Error('Incorrect password');
      }

      const tokens = tokenService.generateTokens({ email: user.email, password: user.password });
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

  async getActiveUsers(userIds) {
    const users = await UserModel.find({ _id: { $in: userIds } });

    return users.map(user => new UserDto(user));
  };
};

module.exports = new UserService();