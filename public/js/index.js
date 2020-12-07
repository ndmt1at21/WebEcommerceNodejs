import '@babel/polyfill';
import { login, reset } from './login';
import { rowProductHtml, fetchData } from './cart';

const loginForm = document.querySelector('.form_container');
const cartTable = document.getElementById('cart-table');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password_in').value;
    const emailForgot = document.getElementById('email_forgot').value;

    if (emailForgot) reset(emailForgot);
    else login(email, password);
  });

if (cartTable) {
  const productsInCart = JSON.parse(localStorage.getItem('cart'));

  for (const id in productsInCart) {
    
    cartTable.insertAdjacentHTML(
      'beforeend',
    );
  }
}
