const slugify = require('slugify');

const createSlugs = (items) => {
  return items.map((itm) => ({
    ...itm,
    slug: slugify(itm.name, { lower: true }),
  }));
};

module.exports = createSlugs;
