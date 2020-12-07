import axios from 'axios';

export const rowProductHtml = (img, productName, url, price, priceDiscount) => {
  return `<tr><td><div class="thumb_cart"><img id="thumb_cart_small" src="img/products/${img}" \
    data-src="img/products/shoes/1.jpg" class="lazy" alt="${url}"></div><span class="item_cart">${productName}</span>\
    </td><td><strong>${price}</strong></td><td><div class="numbers-row">\
    <input type="text" value="1" id="quantity_1" class="qty2" name="quantity_1">\
    <div class="inc button_inc">+</div><div class="dec button_inc">-</div></div>\
    </td><td><strong>${price}</strong></td><td class="options"><a href="#"><i class="ti-trash"></i></a>\
    </td></tr>`;
};

export const fetchData = async (productID) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/racket/${productID}`
    });
  } catch (error) {
    console.log(error);
  }
};
