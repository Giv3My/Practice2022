import axios from 'axios';

import api from '../common/api';
import { API_URL } from './../common/api/index';

class AuthService {
  static async login(values) {
    return axios.post(`${API_URL}/login`, values);
  };

  static async logout() {
    return axios.post(`${API_URL}/logout`);
  };

  static async accessToken() {
    return api.get('/accessToken');
  };
};

export default AuthService;