import _ from "lodash";

const stringify = (query) => {
  let result = "";
  const excludeField = ["search", "sort", "page", "limit", "totalRow"];

  for (const key in query) {
    const queryValue = query[key];
    if (!_.isEmpty(queryValue) || typeof queryValue === "number") {
      if (typeof queryValue !== "object") {
        result += `${key}=${queryValue}&`;
      } else {
        for (const childKey in queryValue) {
          const childValue = queryValue[childKey];
          if (!_.isEmpty(childValue) || typeof childValue === "number") {
            result += `${key}[${childKey}]=${childValue}&`;
          }
        }
      }
    }
  }
  // console.log("obj empty", _.isEmpty({ name: null, age: null }));
  return result.slice(0, -1);
};

export { stringify };
