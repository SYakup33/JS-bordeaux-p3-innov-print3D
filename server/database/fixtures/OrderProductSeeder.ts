import AbstractSeeder from "./AbstractSeeder";
import OrderSeeder from "./OrderSeeder";
import ProductSeeder from "./ProductSeeder";

class OrderProductSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "order_product",
      truncate: true,
      dependencies: [ProductSeeder, OrderSeeder],
    });
  }

  run() {
    const totalOrder = 3;
    const totalProduct = 4;
    for (let i = 0; i < totalOrder; i++) {
      for (let j = 0; j < totalProduct; j++) {
        const fakeOrderProduct = {
          quantity: this.faker.number.int({ min: 1, max: 5 }),
          unit_price: this.faker.commerce.price({ min: 1, max: 4, dec: 2 }),
          product_id: this.getRef(`product_${j}`).insertId,
          order_id: this.getRef(`order_${i}`).insertId,
          refName: `order_product_${i}`,
        };
        this.insert(fakeOrderProduct);
      }
    }
  }
}

export default OrderProductSeeder;
