import { fetchDataRackets } from './fetchDataRackets';
import { formatter } from './formatter';
import {
  getIDs,
  incProduct,
  decProduct,
  deleteProduct,
  setProduct
} from './cartInLocalStorage';

const rowProductHtml = (racket, quantity) => {
  const priceVND = formatter.format(racket.price);
  const totalVND = formatter.format(racket.price * quantity);

  return `<tr><td><div class="thumb_cart"><img id="thumb_cart_small" src="${racket.imageCover}" \
    data-src="img/products/shoes/1.jpg" class="lazy" alt=${racket.slug}></div><a href="/${racket.slug}.${racket._id}">
    <span class="item_cart">${racket.name}</span></a>\
    </td><td><strong>${priceVND}</strong></td><td><div class="numbers-row">\
    <input type="text" value="${quantity}" class="qty2" name="quantity_1">\
    <div class="inc button_inc">+</div><div class="dec button_inc">-</div></div>\
    </td><td><strong>${totalVND}</strong></td><td class="options"><a href="#"><i class="ti-trash" value=${racket._id}></i></a>\
    </td></tr>`;
};

let rackets = [];

export const updateCartTable = async (selector) => {
  // Take ID in  localStorage
  const IDs = getIDs();
  const productsInCart = JSON.parse(localStorage.getItem('cart'));

  // Fetch data from server
  rackets = await fetchDataRackets(IDs);

  if (rackets.length === 0) {
    selector.parentElement.innerHTML =
      '<span>Không có sản phẩm trong giỏ hàng</span>';
    return;
  }

  // Update cart table view
  selector.textContent = '';

  const totalPrice = document.getElementById('totalPrice');
  const summaryTotalPrice = document.getElementById('summaryTotalPrice');

  let prices = 0;
  rackets.forEach((racket) => {
    selector.insertAdjacentHTML(
      'beforeend',
      rowProductHtml(racket, productsInCart[racket._id])
    );
    prices += racket.price * productsInCart[racket._id];
  });

  totalPrice.textContent = formatter.format(prices);
  summaryTotalPrice.textContent = formatter.format(prices);

  const incBtns = document.querySelectorAll('.inc.button_inc');
  const decBtns = document.querySelectorAll('.dec.button_inc');
  const delBtns = document.querySelectorAll('.ti-trash');
  const quantities = document.querySelectorAll('.qty2');

  incBtns.forEach((el) => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();

      el.parentElement.children[0].value++;

      if (el.parentElement.children[0].value >= 10) {
        el.parentElement.children[0].value = 10;
        return;
      }

      const rowIndex = el.parentNode.parentNode.parentNode.rowIndex;

      incProduct(rackets[rowIndex - 1]._id);
      updateCartTable(selector);
    });
  });

  decBtns.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();

      el.parentElement.children[0].value--;

      if (el.parentElement.children[0].value < 1) {
        el.parentElement.children[0].value = 1;
        return;
      }

      const rowIndex = el.parentNode.parentNode.parentNode.rowIndex;

      decProduct(rackets[rowIndex - 1]._id);
      updateCartTable(selector);
    });
  });

  delBtns.forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();

      const rowIndex = el.parentNode.parentNode.parentNode.rowIndex;

      deleteProduct(rackets[rowIndex - 1]._id);
      updateCartTable(selector);
    })
  );

  quantities.forEach((el) =>
    el.addEventListener('change', (e) => {
      e.preventDefault();

      if (el.value > 10) {
        el.value = 10;
      } else if (el.value < 1) {
        el.value = 1;
      } else if (!Number.isInteger(Number(el.value))) {
        el.value = 1;
      }

      const rowIndex = el.parentNode.parentNode.parentNode.rowIndex;

      setProduct(rackets[rowIndex - 1]._id, el.value);
      updateCartTable(selector);
    })
  );
};
