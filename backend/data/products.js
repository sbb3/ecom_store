const { faker } = require("@faker-js/faker");
const slugify = require("slugify");

const products = [];

for (let i = 0; i < 100; i++) {
  const productName = faker.commerce.productName();
  const productBrand = faker.commerce.productMaterial();

  const product = {
    name: productName,
    brand: productBrand,
    price: faker.commerce.price(),
    imagesUrls: faker.image.url({ height: 600, width: 1000 }), // 300x200, 1000x600
    platform: faker.commerce.productMaterial(),
    slug: slugify(productName.concat(" ", productBrand), { lower: true }),
    category: faker.helpers.arrayElement([
      "effects",
      "instruments",
      "studio-tools",
    ]),
    buyLinks: [{ link: faker.internet.url() }, { link: faker.internet.url() }],
    description: faker.commerce.productDescription(),
  };
  products.push(product);
}

// console.log(products);

module.exports = { products };
