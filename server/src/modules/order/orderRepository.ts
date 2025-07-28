import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class OrderRepository {
  static readonly STATUS_PENDING_PAYMENT = "en attente de paiement";
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

    for (const { productId, quantity, price } of products) {
      await databaseClient.query<Result>(
        "INSERT INTO `order_product` (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
        [orderId, productId, quantity, price],
      );
    }

    const idOrderedProducts = products.map((p) => p.productId);
    const placeholders = idOrderedProducts.map(() => "?").join(",");
    await databaseClient.query<Result>(
      `DELETE FROM cart WHERE user_id = ? AND product_id IN (${placeholders})`,
      [userId, ...idOrderedProducts],
    );

    return orderId;
  }

  async createPendingOrder(
    userId: number,
    products: OrderProduct[],
    sessionId: string,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO `orders` (user_id, status, stripe_session_id) VALUES (?,?,?)",
      [userId, OrderRepository.STATUS_PENDING_PAYMENT, sessionId],
    );

    const orderId = result.insertId;

    for (const { productId, quantity, price } of products) {
      await databaseClient.query<Result>(
        "INSERT INTO `order_product` (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
        [orderId, productId, quantity, price],
      );
    }

    return orderId;
  }

  async confirmOrder(sessionId: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE `orders` SET status = ? WHERE stripe_session_id = ?",
      [OrderRepository.STATUS_PREPARATION, sessionId],
    );

    if (result.affectedRows > 0) {
      const [orderRows] = await databaseClient.query<Rows>(
        "SELECT user_id FROM `orders` WHERE stripe_session_id = ?",
        [sessionId],
      );

      if (orderRows.length > 0) {
        const userId = orderRows[0].user_id;

        const [productRows] = await databaseClient.query<Rows>(
          `SELECT op.product_id 
           FROM order_product op 
           JOIN orders o ON op.order_id = o.id 
           WHERE o.stripe_session_id = ?`,
          [sessionId],
        );

        const productIds = productRows.map((p) => p.product_id);
        const placeholders = productIds.map(() => "?").join(",");

        await databaseClient.query<Result>(
          `DELETE FROM cart WHERE user_id = ? AND product_id IN (${placeholders})`,
          [userId, ...productIds],
        );
      }
    }

    return result.affectedRows > 0;
  }

  async cancelPendingOrder(sessionId: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE `orders` SET status = ? WHERE stripe_session_id = ? AND status = ?",
      [
        OrderRepository.STATUS_CANCELLED,
        sessionId,
        OrderRepository.STATUS_PENDING_PAYMENT,
      ],
    );

    return result.affectedRows > 0;
  }
}

export default new OrderRepository();
