const { query } = require('express');

module.exports = (queryObj) => {
  if (queryObj.price) {
    if (!queryObj.price.includes('-')) return;

    const priceArr = queryObj.price.split(',');
    let priceQueryArr = [];

    priceArr.forEach((price) => {
      let [minPrice, maxPrice] = price.split('-');

      if (maxPrice === 0) maxPrice = undefined;

      if (minPrice && maxPrice) {
        priceQueryArr.push({ price: { gte: minPrice, lte: maxPrice } });
      } else if (minPrice) {
        priceQueryArr.push({ price: { gte: minPrice } });
      } else {
        priceQueryArr.push({ price: { lte: maxPrice } });
      }
      console.log(priceQueryArr);
    });

    queryObj.price = undefined;
    queryObj.$or = priceQueryArr;
  }
};
