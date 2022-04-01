import Slugify from "slugify";

const slugify = (string) => {
  return Slugify(string, { lower: true });
};

export { slugify };
