import AbstractSeeder from "./AbstractSeeder";
import ProductSeeder from "./ProductSeeder";
import UserSeeder from "./UserSeeder";

class FavoriteSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "favorite",
      truncate: true,
      dependencies: [ProductSeeder, UserSeeder],
    });
  }

  run() {
    for (let i = 0; i < 10; i++) {
      const userRef = this.getRef(`user_${i}`);
      if (userRef) {
        for (let j = 0; j < 10; j++) {
          const productRef = this.getRef(`product_${j}`);
          if (productRef) {
            const fakeFavorite = {
              user_id: userRef.insertId,
              product_id: productRef.insertId,
            };
            this.insert(fakeFavorite);
          }
        }
      }
    }
  }
}

export default FavoriteSeeder;
