class APIFeatures {
  constructor(query, queryReqObj) {
    this.query = query;
    this.queryReqObj = queryReqObj;
  }

  filter() {
    const newQueryObj = { ...this.queryReqObj };
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach((el) => delete newQueryObj[el]);

    // convert condition $or. Ex: name=3,5 -> {'$or': [{name: 3}, {name: 5}]}
    for (const key in newQueryObj) {
      // check value of query has ','
      if (newQueryObj[key].includes(',')) {
        let valueArr = newQueryObj[key].split(',');
        newQueryObj[key] = { $in: valueArr };
      }
    }

    // convert to operator in mongoose
    let queryStr = JSON.stringify(newQueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  limit() {
    if (this.queryReqObj.limit) {
      this.query = this.query.limit(this.queryReqObj.limit);
    }

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
