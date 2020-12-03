class APIFeatures {
  constructor(query, queryReqObj) {
    this.query = query;
    this.queryReqObj = queryReqObj;
  }

  filter() {
    const newQueryObj = { ...this.queryReqObj };
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach((el) => delete newQueryObj[el]);

    // convert to operator in mongoose
    let queryStr = JSON.stringify(newQueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryReqObj.sort) {
      const sortBy = this.queryReqObj.sort.split(',').join('');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdDate');
    }

    return this;
  }
}

module.exports = APIFeatures;
