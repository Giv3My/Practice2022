import axios from 'axios';

import api from '../common/api';
import { API_URL } from './../common/api';

class AuthService {
  static async registration(values) {
    return axios.post(`${API_URL}/registration`, values);
  };

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