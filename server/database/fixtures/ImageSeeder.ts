import AbstractSeeder from "./AbstractSeeder";
import ProductSeeder from "./ProductSeeder";

class ImageSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "image", truncate: true, dependencies: [ProductSeeder] });
  }

  run() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        const fakeImage = {
          path: this.faker.image.url(),
          product_id: this.getRef(`product_${i}`).insertId,
        };
        this.insert(fakeImage);
      }
    }
  }
}

export default ImageSeeder;
