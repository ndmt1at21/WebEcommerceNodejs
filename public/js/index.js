import '@babel/polyfill';
import { login, reset } from './login';
import { updateCartTable } from './cart';

/////////////////////////////////////////////////
// SELECTOR
const seachForm = document.querySelector('.custom-search-input');
const loginForm = document.querySelector('.form_container');
const tableCartBody = document.querySelector('#cart-table > tbody');

if (seachForm) {
  seachForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let query = `/search/?keyword=${seachForm.firstChild.value}`;
    window.location.href = query;
  });
}

if (loginForm)
  /////////////////////////////////////////////////
  // PROCESSING
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password_in').value;
    const emailForgot = document.getElementById('email_forgot').value;

    if (emailForgot) reset(emailForgot);
    else login(email, password);
  });

if (tableCartBody) {
  updateCartTable(tableCartBody);
}
