import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8002/api/v1/user/login',
      data: {
        email,
        password
      }
    });
    showAlert('success', 'Login successfully');
    setTimeout(() => {
      window.location.assign('/');
    }, 1000);
  } catch (error) {
    console.log(error);
    showAlert('error', 'Login fail');
  }
};

export const reset = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/user/reset',
      data: {
        email,
        password
      }
    });
    showAlert('success', 'Please check your email to reset your password');
  } catch (error) {
    console.log(error);
    showAlert('error', error.respone.message);
  }
};
