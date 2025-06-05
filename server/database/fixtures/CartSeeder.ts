import AbstractSeeder from "./AbstractSeeder";
import ProductSeeder from "./ProductSeeder";
import UserSeeder from "./UserSeeder";

class CartSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "cart",
      truncate: true,
      dependencies: [ProductSeeder, UserSeeder],
    });
  }
  run() {
    for (let i = 0; i < 10; i++) {
      const userRef = this.getRef(`user_${i}`);
      const nbProducts = this.faker.number.int({ min: 1, max: 10 });

      for (let j = 0; j < nbProducts; j++) {
        const productRef = this.getRef(`product_${j}`);

        const fakeCart = {
          product_id: productRef.insertId,
          user_id: userRef.insertId,
          quantity: this.faker.number.int({ min: 1, max: 10 }),
        };
        this.insert(fakeCart);
      }
    }
  }
}

export default CartSeeder;
