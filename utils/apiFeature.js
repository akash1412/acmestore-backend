class APIFeature {
  constructor(queryObj, queryStr) {
    this.query = queryObj;
    this.queryStr = queryStr;
  }

  sort() {
    if (this.queryStr.sort) {
      const sort = this.queryStr.sort.split(',').join(' ');

      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort('-price');
    }

    return this;
  }

  paginate() {
    const page = +this.queryStr.page | 1;
    const limit = +this.queryStr.limit | 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }
}

module.exports = APIFeature;
