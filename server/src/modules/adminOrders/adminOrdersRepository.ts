import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class cartRepository {
  async findAll() {
    const [orders] = await databaseClient.query<Rows>(
      `SELECT o.id AS orderId, o.created_at, o.status,
       u.firstname, u.lastname, u.email, u.phone,
       p.id AS productId, p.name AS productName,
       op.quantity
       FROM orders o
       JOIN user u ON o.user_id = u.id
       JOIN order_product op ON o.id = op.order_id
       JOIN product p ON p.id = op.product_id
       ORDER BY o.created_at DESC`,
    );

    for (const order of orders) {
      const [imgRows] = await databaseClient.query<Rows>(
        `SELECT path
         FROM image
         WHERE product_id = ? LIMIT 1`,
        [order.productId],
      );

      order.images = imgRows.map((img) => img.path);
    }

    return orders;
  }

  async updateStatus(orderId: number, status: string) {
    const [result] = await databaseClient.query(
      "update orders SET status = ? WHERE id = ?",
      [status, orderId],
    );
    return result;
  }
}

export default new cartRepository();
