import axios from 'axios';
import { PromiseProvider } from 'mongoose';

const rowProductHtml = (img, productName, url, price) => {
  const formatter = Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
  const priceVND = formatter.format(price);

  return `<tr><td><div class="thumb_cart"><img id="thumb_cart_small" src="img/products/${img}" \
    data-src="img/products/shoes/1.jpg" class="lazy" alt=${url}></div><span class="item_cart">${productName}</span>\
    </td><td><strong>${priceVND}</strong></td><td><div class="numbers-row">\
    <input type="text" value="1" id="quantity_1" class="qty2" name="quantity_1">\
    <div class="inc button_inc">+</div><div class="dec button_inc">-</div></div>\
    </td><td><strong>${priceVND}</strong></td><td class="options"><a href="#"><i class="ti-trash"></i></a>\
    </td></tr>`;
};

const fetchDataRacketFromCart = async (IDs) => {
  const url = `http://127.0.0.1:8002/api/v1/racket?_id=`;

  let query = '';
  IDs.map((id) => {
    if (!query) query = id;
    else query += `,${id}`;
  });

  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url + query
    })
      .then((res) => resolve(res.data.data.rackets))
      .catch((err) => reject(console.log(err)));
  });
};

export const updateCartTable = async (selector) => {
  // Take ID in  localStorage
  const productsInCart = JSON.parse(localStorage.getItem('cart'));
  let IDs = [];
  for (const id in productsInCart) {
    IDs.push(id);
  }

  // Fetch data from server
  const rackets = await fetchDataRacketFromCart(IDs);

  // Update cart table view
  console.log(rackets);
  rackets.forEach((racket) => {
    console.log(rackets);
    selector.insertAdjacentHTML(
      'afterbegin',
      rowProductHtml(racket.imageCover, racket.name, racket.slug, racket.price)
    );
  });
};
