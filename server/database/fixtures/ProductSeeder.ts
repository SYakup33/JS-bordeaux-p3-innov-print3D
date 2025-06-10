import AbstractSeeder from "./AbstractSeeder";
import CategorySeeder from "./CategorySeeder";

class ProductSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "product", truncate: true, dependencies: [CategorySeeder] });
  }

  run() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 4; j++) {
        const fakeProduct = {
          name: this.faker.commerce.productName(),
          description: this.faker.commerce.productDescription(),
          price: this.faker.commerce.price({ min: 1, max: 40 }),
          category_id: this.getRef(`category_${j}`).insertId,
          refName: `product_${i}`,
        };
        this.insert(fakeProduct);
      }
    }
  }
}

export default ProductSeeder;
