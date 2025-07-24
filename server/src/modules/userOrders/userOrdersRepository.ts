import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userOrdersRepository {
  async findByUserId(userId: number) {
    const [ordersByUser] = await databaseClient.query<Rows>(
      `SELECT 
        o.id as orderId,
        o.status,
        o.created_at as createdAt
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC`,
      [userId],
    );

    for (const order of ordersByUser) {
      const [productsOrders] = await databaseClient.query<Rows>(
        `SELECT p.id AS productId, p.name AS productName,
         op.quantity, op.unit_price AS unitPrice
         FROM order_product op
         JOIN product p ON op.product_id = p.id
         WHERE op.order_id = ?`,
        [order.orderId],
      );

      for (const product of productsOrders) {
        const [imgRows] = await databaseClient.query<Rows>(
          "select path from image WHERE product_id = ? LIMIT 1",
          [product.productId],
        );
        product.image = imgRows[0].path;
      }
      order.products = productsOrders;
    }

    return ordersByUser;
  }
}

export default new userOrdersRepository();
