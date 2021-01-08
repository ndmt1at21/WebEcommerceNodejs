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
  showAlert('error', `Login fail: ${error.message}`);
 }
};

export const reset = async (email) => {
 try {
  const res = await axios({
   method: 'POST',
   url: 'http://127.0.0.1:8002/api/v1/user/reset',
   data: {
    email
   }
  });
  showAlert('success', 'Please check your email to reset your password');
 } catch (error) {
  console.log(error);
  showAlert('error', error.message);
 }
};

export const register = async (
 email,
 password,
 name,
 lastName,
 address,
 phone
) => {
 try {
  const res = await axios({
   method: 'POST',
   url: 'http://127.0.0.1:8002/api/v1/user/signup',
   data: {
    email,
    password,
    name,
    lastName,
    address,
    phone
   }
  });
 } catch (error) {
  showAlert('error', error.message);
 }
};

export const logout = async () => {
 try {
  const res = await axios({
   method: 'GET',
   url: 'http://127.0.0.1:8002/api/v1/user/logout'
  });

  if (res.data.status == 'success') {
   console.log(res.data);
   location.reload();
  }
 } catch (error) {
  showAlert('Error logging out');
 }
};
