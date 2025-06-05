import AbstractSeeder from "./AbstractSeeder";
import CategorySeeder from "./CategorySeeder";
import ProductSeeder from "./ProductSeeder";

class CategoryProductSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "category_product",
      truncate: true,
      dependencies: [ProductSeeder, CategorySeeder],
    });
  }
  run() {
    for (let i = 0; i < 10; i++) {
      const productRef = this.getRef(`product_${i}`);
      const categoryRef = this.getRef(`category_${i}`);

      if (productRef && categoryRef) {
        const fakeCategoryProduct = {
          product_id: productRef.insertId,
          category_id: categoryRef.insertId,
        };
        this.insert(fakeCategoryProduct);
      }
    }
  }
}

export default CategoryProductSeeder;
