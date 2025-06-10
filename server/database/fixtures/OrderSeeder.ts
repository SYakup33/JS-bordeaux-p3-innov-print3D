import AbstractSeeder from "./AbstractSeeder";
import ProductSeeder from "./ProductSeeder";
import UserSeeder from "./UserSeeder";

class OrderSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "orders",
      truncate: true,
      dependencies: [UserSeeder, ProductSeeder],
    });
  }

  run() {
    for (let i = 0; i < 3; i++) {
      const fakeOrder = {
        status: this.faker.helpers.arrayElement([
          "en préparation",
          "expédiée",
          "livrée",
          "annulée",
        ]),
        user_id: this.getRef(`user_${i}`).insertId,
        refName: `order_${i}`,
      };
      this.insert(fakeOrder);
    }
  }
}

export default OrderSeeder;
