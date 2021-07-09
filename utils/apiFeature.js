class APIFeature {
  constructor(queryObj, queryStr, totalDocuments) {
    this.query = queryObj;
    this.queryStr = queryStr;
    this.totalDocuments = totalDocuments;
    this.hasPrevPage = false;
    this.hasNextPage = false;
    this.curPage = 0;
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

    if (page >= 1) {
      this.hasPrevPage = false;
    }
    this.curPage = page;

    const check = this.totalDocuments / (this.curPage + 1);

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  filter() {
    const filter = this.queryStr.category;

    if (this.queryStr.category) {
      this.query = this.query.find({ category: filter });
    }

    //
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
