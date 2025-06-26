import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type OrderProduct = {
  product_id: number;
  quantity: number;
  unit_price: number;
};

class OrderRepository {
  async create(userId: number, products: OrderProduct[]) {
    const [result] = await databaseClient.query<Result>(
      "insert into `orders` (user_id, status) values (?, 'en préparation')",
      [userId],
    );
    const orderId = result.insertId;

    for (const { product_id, quantity, unit_price } of products) {
      await databaseClient.query<Result>(
        "insert into `order_product` (order_id, product_id, quantity, unit_price) values (?, ?, ?, ?)",
        [orderId, product_id, quantity, unit_price],
      );
    }

    const idOrderedProducts = products.map((p) => p.product_id);
    const placeholders = idOrderedProducts.map(() => "?").join(",");

    await databaseClient.query<Result>(
      `DELETE FROM cart WHERE user_id = ? AND product_id IN (${placeholders})`,
      [userId, ...idOrderedProducts],
    );

    return orderId;
  }
}

export default new OrderRepository();
