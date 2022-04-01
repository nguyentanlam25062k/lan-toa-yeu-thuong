import _ from "lodash";
import { Op } from "sequelize";

// function APIFeatures(query, queryString) {
//   this.query = query;
//   this.queryString = queryString;

//   this.pagination = () => {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 5 || 5;
//     const offset = limit * (page - 1);

//     this.query = this.query.slice(offset, limit);
//     return this;
//   };

//   this.sort = () => {
//     const sort = this.queryString.sort || "createdAt";
//     const sortField = sort.replace("-", "");
//     const order = sort.includes("-") ? "desc" : "asc";

//     this.query = _.orderBy(this.query, [sortField], [order]);
//     return this;
//   };

//   this.search = () => {
//     const search = this.queryString.search;
//     const searchField = this.queryString.fieldSearch || "name";
//     if (search) {
//       this.query = this.query.filter((item) => item[searchField].toUpperCase().includes(search.toUpperCase()));
//     } else {
//       this.query = this.query;
//     }
//     return this;
//   };

//   this.filter = () => {
//     const queryObj = { ...this.queryString };
//     const excludedFields = ["page", "sort", "limit", "search", "searchField"];
//     excludedFields.forEach((field) => delete queryObj[field]);

//     // let filterArr = ["lt", "lte", "gt", "gte"];
//     const filterField = Object.keys(queryObj)[0];
//     // filterArr = filterArr.filter((item) => Object.keys(queryObj[filterField]).includes(item));
//     for (const key in queryObj[queryObj]) {
//       if (key === "lt") {
//         console.log('========== lt')
//         this.query = this.query((item) => item[filterField] < queryObj[queryObj].key);
//       }
//       if (key === "gt") {
//         console.log('========== gt')
//         this.query = this.query((item) => item[filterField] > queryObj[queryObj].key);
//       }
//     }
//     console.log('query', this.query);
//     return this;
//   };
// }

function APIFeatures(queryString) {
  this.query = {};

  this.where = () => {
    const fields = queryString.where;
    for (const key in fields) {
      const value = fields[key];
      if (value !== "ALL") {
        this.query.where = {
          ...this.query.where,
          [key]: value
        };
      }
    }

    return this;
  };

  this.pagination = () => {
    const page = Number(queryString?.page) || 1;
    const limit = Number(queryString?.limit) || 5;
    const offset = limit * (page - 1);

    this.query = { ...this.query, offset, limit };

    return this;
  };

  this.sort = () => {
    const sort = queryString?.sort || "createdAt";
    const order = sort.includes("-") ? [[sort.replace("-", ""), "DESC"]] : [[sort, "ASC"]];
    this.query = { ...this.query, order };
    return this;
  };

  this.search = (field = "name") => {
    const search = queryString?.search || "";
    this.query.where = {
      ...this.query.where,
      [field]: { [Op.like]: `%${search}%` }
    };
    return this;
  };

  this.filter = () => {
    const queryObj = { ...queryString };
    const excludedFields = ["page", "sort", "limit", "search", "where"];
    excludedFields.forEach((field) => delete queryObj[field]);
    const firstField = Object.keys(queryObj)[0];
    let objFirstField = {};

    for (const key in queryObj[firstField]) {
      const value = +queryObj[firstField][key];
      if (key === "gt" && value) {
        objFirstField = { ...objFirstField, [Op.gt]: value };
      }
      if (key === "gte" && value) {
        objFirstField = { ...objFirstField, [Op.gte]: value };
      }
      if (key === "lt" && value) {
        objFirstField = { ...objFirstField, [Op.lt]: value };
      }
      if (key === "lte" && value) {
        objFirstField = { ...objFirstField, [Op.lte]: value };
      }
      this.query.where = {
        ...this.query.where,
        [firstField]: objFirstField
      };
    }

    return this;
  };
}

export { APIFeatures };
