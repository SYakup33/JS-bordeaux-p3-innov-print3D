import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

// //
// enum Status {
//   STATUS_PREPARATION = "en préparation",
//   STATUS_SENT = "expédiée",
//   STATUS_DELIVERED = "livrée",
//   STATUS_CANCELLED = "annulée",
// }

// function f(s: string) {
//   console.log(s);
// }

// f("coucou");

class OrderRepository {
  static readonly STATUS_PREPARATION = "en préparation";
  static readonly STATUS_SENT = "expédiée";
  static readonly STATUS_DELIVERED = "livrée";
  static readonly STATUS_CANCELLED = "annulée";
  async create(userId: number, products: OrderProduct[]) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO `orders` (user_id, status) VALUES (?,?)",
      [userId, OrderRepository.STATUS_PREPARATION],
    );
    const orderId = result.insertId;

    for (const { product_id, quantity, unit_price } of products) {
      await databaseClient.query<Result>(
        "INSERT INTO `order_product` (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
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
