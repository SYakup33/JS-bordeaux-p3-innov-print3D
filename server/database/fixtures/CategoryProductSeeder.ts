import AbstractSeeder from "./AbstractSeeder";
import CategorySeeder from "./CategorySeeder";
import ProductSeeder from "./ProductSeeder";

class CategoryProductSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "category_product",
      truncate: true,
      dependencies: [CategorySeeder, ProductSeeder],
    });
  }
  run() {
    const nbrCategory = 4;

    for (let i = 0; i < 10; i++) {
      const productRef = this.getRef(`product_${i}`);
      const firstCategoryId = this.getRef(
        `category_${Math.floor(Math.random() * nbrCategory)}`,
      );

      const fakeCategoryProduct = {
        product_id: productRef.insertId,
        category_id: firstCategoryId.insertId,
      };
      this.insert(fakeCategoryProduct);
    }
  }
}
export default CategoryProductSeeder;
