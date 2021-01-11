import '@babel/polyfill';
import { login, register, logout, forgot, reset } from './auth';
import { updateCartTable } from './cart';
import {} from './header';
import { sendReview } from './leave-review';
import { deleteProduct } from './cartInLocalStorage';
import { updateSetting } from './updateSettings';

/////////////////////////////////////////////////
// SELECTOR
const searchForm = document.querySelector('.custom-search-input');
const loginForm = document.getElementById('form_login');
const registerForm = document.getElementById('form_register');

const tableCartBody = document.querySelector('#cart-table > tbody');

const reviewForm = document.getElementById('form_review');

const cardReview = document.getElementById('card_body_review');

const pagination = document.querySelector('.pagination');

const logoutButton = document.getElementById('logout');

const formReset = document.getElementById('reset_password');

const formUpdateInfo = document.getElementById('formUpdateInfo');

if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let query = `/search?keyword=${searchForm.firstChild.value}`;
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

    if (emailForgot) {
      forgot(emailForgot);
    } else if (email && password) {
      login(email, password);
    }
  });

if (tableCartBody) {
  updateCartTable(tableCartBody).then(() => {
    const deleteProductCartBtns = document.querySelectorAll('.ti-trash');

    if (deleteProductCartBtns) {
      deleteProductCartBtns.forEach((btn) =>
        btn.addEventListener('click', (e) => {
          e.preventDefault();

          deleteProduct(btn.getAttribute('value'));
          window.location.reload();
        })
      );
    }
  });
}

// registerForm.addEventListener('click', (e) => console.log('dfdfjhn'));
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email_register').value;
    const password = document.getElementById('password_register').value;
    const name = document.getElementById('name_register').value;
    const lastname = document.getElementById('lastName_register').value;
    const addr = document.getElementById('addr_register').value;
    const phone = document.getElementById('phone_register').value;

    register(email, password, name, lastname, addr, phone);
  });
}

if (reviewForm) {
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const star = document.querySelectorAll('.rating-input:checked')[0].value;
    const title = document.getElementById('title-review').value;
    const content = document.getElementById('content-review').value;

    let slugID = window.location.pathname.toString().split('/')[1];

    await sendReview(star, title, content, slugID.split('.')[1]);
  });
}

if (pagination) {
  pagination.addEventListener('click', (e) => {
    e.preventDefault();
    const racketID = window.location.pathname.split('.')[1];

    showReviews(racketID, e.target.value);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();

    logout();
  });
}

if (formReset) {
  formReset.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('new_password').value;
    const passwordConfirm = document.getElementById('confirm_password').value;

    let url = window.location.toString();
    const token = url.substr(url.lastIndexOf('/') + 1);

    reset(newPassword, passwordConfirm, token);
  });
}

if (formUpdateInfo) {
  formUpdateInfo.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', document.getElementById('name').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('photo', document.getElementById('inputImg').files[0]);

    updateSetting(formData, 'info');
  });
}
