import '@babel/polyfill';
import { login, reset } from './login';

const loginForm = document.querySelector('.form_container');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password_in').value;
    const emailForgot = document.getElementById('email_forgot').value;

    if (emailForgot) reset(emailForgot);
    else login(email, password);
  });
