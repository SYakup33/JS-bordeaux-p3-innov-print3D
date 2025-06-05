import AbstractSeeder from "./AbstractSeeder";

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
  }

  run() {
    const categories = ["Déco", "High-Tech", "Accessoire", "Figurine"];
    for (let i = 0; i < categories.length; i++) {
      const fakeCategory = {
        name: categories[i],
        refName: `category_${i}`,
      };
      this.insert(fakeCategory);
    }
  }
}

export default CategorySeeder;
