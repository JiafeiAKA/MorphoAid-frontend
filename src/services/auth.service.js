import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }


  logout() {
    localStorage.removeItem('user');
  }


  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      roles: user.roles,  
      invitationToken: user.invitationToken 
    });
  }


}

export default new AuthService();
