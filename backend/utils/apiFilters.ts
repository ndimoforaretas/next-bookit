class APIFilters {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): APIFilters {
    const location = this.queryStr?.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }
}

export default APIFilters;
